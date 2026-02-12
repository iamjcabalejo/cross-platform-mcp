import path from "node:path";
import fs from "node:fs";
import type { Resource } from "@modelcontextprotocol/sdk/types.js";
import { getCopilotPaths, hasCopilotAgentsDir, readFileSafe, listDirSafe } from "../config.js";
import type { PlatformManifest } from "./types.js";
import { configUri, type Category } from "./types.js";

const MIME_MARKDOWN = "text/markdown";

const COPILOT_AGENT_SUFFIX = ".agent.md";

/** GitHub Copilot custom agents: only agent category; no commands, skills, rules, or hooks. */
function loadCopilotManifest(): PlatformManifest {
  return {
    commands: [],
    agents: [],
    skills: [],
    rules: [],
  };
}

/**
 * Extract description from YAML frontmatter (first line matching "description: ...").
 */
function descriptionFromFrontmatter(content: string): string | undefined {
  const match = content.match(/^---\s*\n[\s\S]*?description:\s*["']?([^"'\n]+)["']?/m);
  return match?.[1]?.trim();
}

function listAgentsRes(): Resource[] {
  const paths = getCopilotPaths();
  const files = listDirSafe(paths.agentsDir).filter(
    (n) => n.endsWith(COPILOT_AGENT_SUFFIX) && /^[.\-_a-zA-Z0-9]+\.agent\.md$/.test(n)
  );
  return files.map((file) => {
    const id = file.replace(COPILOT_AGENT_SUFFIX, "");
    const filePath = path.join(paths.agentsDir, file);
    const content = readFileSafe(filePath);
    const description = content ? descriptionFromFrontmatter(content) : undefined;
    return {
      uri: configUri("copilot", "agent", id),
      name: id,
      description: description ?? `GitHub Copilot custom agent: ${id}`,
      mimeType: MIME_MARKDOWN,
    };
  });
}

export function createCopilotBackend(): import("./types.js").PlatformBackend {
  return {
    platform: "copilot",
    hasPaths() {
      const root = getCopilotPaths().root;
      return hasCopilotAgentsDir(root);
    },
    loadManifest(): PlatformManifest {
      return loadCopilotManifest();
    },
    listResources(): Resource[] {
      return listAgentsRes();
    },
    readResource(uri: URL): { text: string; mimeType: string } | { error: string } {
      const paths = getCopilotPaths();
      if (!hasCopilotAgentsDir(paths.root)) {
        return { error: "Copilot config not found (.github/agents missing)." };
      }
      const platform = uri.hostname;
      if (platform !== "copilot") {
        return { error: `Expected config://copilot/... got ${uri.href}` };
      }
      const pathname = uri.pathname.replace(/^\/+/, "");
      const parts = pathname.split("/");
      const category = parts[0] as Category | undefined;
      const id = decodeURIComponent(parts.slice(1).join("/"));
      if (!category || !id) {
        return { error: "Invalid URI: expected config://copilot/{category}/{id}" };
      }
      if (category !== "agent") {
        return { error: `Copilot only supports 'agent' category. Got: ${category}` };
      }
      const safeId = id.replace(/[^.\-_a-zA-Z0-9]/g, "");
      if (safeId !== id) {
        return { error: `Invalid agent id (use only . - _ a-z A-Z 0-9): ${id}` };
      }
      const filePath = path.join(paths.agentsDir, `${id}${COPILOT_AGENT_SUFFIX}`);
      const content = readFileSafe(filePath);
      if (content === null) {
        return { error: `Resource not found: ${uri.href}` };
      }
      return { text: content, mimeType: MIME_MARKDOWN };
    },
  };
}
