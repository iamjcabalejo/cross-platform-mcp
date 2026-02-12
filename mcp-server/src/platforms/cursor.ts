import path from "node:path";
import fs from "node:fs";
import type { Resource } from "@modelcontextprotocol/sdk/types.js";
import {
  getCursorPaths,
  hasCursorDir,
  readFileSafe,
  listDirSafe,
  findMarkdownIds,
} from "../config.js";
import { loadManifest, getCommandDescription, getAgentDescription, getSkillDescription, getRuleDescription } from "../manifest.js";
import type { PlatformManifest } from "./types.js";
import { configUri, type Category } from "./types.js";

const MIME_MARKDOWN = "text/markdown";
const MIME_PLAIN = "text/plain";
const MIME_JSON = "application/json";
const CURSOR_COMMANDS_PREFIX = ".cursor/commands/";

function listCommandsRes(manifest: PlatformManifest): Resource[] {
  const paths = getCursorPaths();
  const ids = findMarkdownIds(paths.commandsDir);
  return ids.map((id) => {
    const description = getCommandDescription(manifest, id, CURSOR_COMMANDS_PREFIX);
    return {
      uri: configUri("cursor", "command", id),
      name: id.split("/").pop() ?? id,
      description: description ?? undefined,
      mimeType: MIME_MARKDOWN,
    };
  });
}

function listSkillsRes(manifest: PlatformManifest): Resource[] {
  const paths = getCursorPaths();
  const names = listDirSafe(paths.skillsDir).filter((name) => {
    const skillPath = path.join(paths.skillsDir, name);
    try {
      return fs.statSync(skillPath).isDirectory() && fs.existsSync(path.join(skillPath, "SKILL.md"));
    } catch {
      return false;
    }
  });
  return names.map((name) => {
    const description = getSkillDescription(manifest, name);
    return {
      uri: configUri("cursor", "skill", name),
      name,
      description: description ?? undefined,
      mimeType: MIME_MARKDOWN,
    };
  });
}

function listAgentsRes(manifest: PlatformManifest): Resource[] {
  const paths = getCursorPaths();
  const files = listDirSafe(paths.agentsDir).filter((n) => n.endsWith(".md"));
  return files.map((file) => {
    const name = file.replace(/\.md$/, "");
    const description = getAgentDescription(manifest, name);
    return {
      uri: configUri("cursor", "agent", name),
      name,
      description: description ?? undefined,
      mimeType: MIME_MARKDOWN,
    };
  });
}

function listRulesRes(manifest: PlatformManifest): Resource[] {
  const paths = getCursorPaths();
  const files = listDirSafe(paths.rulesDir).filter((n) => n.endsWith(".mdc"));
  return files.map((file) => {
    const name = file.replace(/\.mdc$/, "");
    const description = getRuleDescription(manifest, name);
    return {
      uri: configUri("cursor", "rule", name),
      name,
      description: description ?? undefined,
      mimeType: MIME_MARKDOWN,
    };
  });
}

function listHooksRes(): Resource[] {
  const paths = getCursorPaths();
  const resources: Resource[] = [];
  const files = listDirSafe(paths.hooksDir).filter((n) => n.endsWith(".sh"));
  for (const file of files) {
    const name = file.replace(/\.sh$/, "");
    resources.push({
      uri: configUri("cursor", "hook", name),
      name,
      description: `Hook script: ${name}`,
      mimeType: MIME_PLAIN,
    });
  }
  if (readFileSafe(paths.hooksJsonPath) !== null) {
    resources.push({
      uri: configUri("cursor", "hook", "config"),
      name: "config",
      description: "hooks.json configuration",
      mimeType: MIME_JSON,
    });
  }
  return resources;
}

export function createCursorBackend(): import("./types.js").PlatformBackend {
  return {
    platform: "cursor",
    hasPaths() {
      const paths = getCursorPaths();
      return hasCursorDir(paths.root);
    },
    loadManifest(): PlatformManifest {
      return loadManifest(getCursorPaths());
    },
    listResources(manifest: PlatformManifest): Resource[] {
      return [
        ...listCommandsRes(manifest),
        ...listSkillsRes(manifest),
        ...listAgentsRes(manifest),
        ...listRulesRes(manifest),
        ...listHooksRes(),
      ];
    },
    readResource(uri: URL): { text: string; mimeType: string } | { error: string } {
      const paths = getCursorPaths();
      if (!hasCursorDir(paths.root)) {
        return { error: "Cursor config root not found (.cursor missing)." };
      }
      const platform = uri.hostname;
      if (platform !== "cursor") {
        return { error: `Expected config://cursor/... got ${uri.href}` };
      }
      const pathname = uri.pathname.replace(/^\/+/, "");
      const parts = pathname.split("/");
      const category = parts[0] as Category | undefined;
      const id = decodeURIComponent(parts.slice(1).join("/"));
      if (!category || !id) {
        return { error: "Invalid URI: expected config://cursor/{category}/{id}" };
      }

      let filePath: string | null = null;
      let mimeType = MIME_MARKDOWN;

      switch (category) {
        case "command":
          filePath = path.join(paths.commandsDir, `${id}.md`);
          break;
        case "skill":
          filePath = path.join(paths.skillsDir, id, "SKILL.md");
          break;
        case "agent":
          filePath = path.join(paths.agentsDir, `${id}.md`);
          break;
        case "rule":
          filePath = path.join(paths.rulesDir, `${id}.mdc`);
          break;
        case "hook":
          if (id === "config") {
            filePath = paths.hooksJsonPath;
            mimeType = MIME_JSON;
          } else {
            filePath = path.join(paths.hooksDir, `${id}.sh`);
            mimeType = MIME_PLAIN;
          }
          break;
        default:
          return { error: `Unknown category: ${category}` };
      }

      const content = filePath ? readFileSafe(filePath) : null;
      if (content === null) {
        return { error: `Resource not found: ${uri.href}` };
      }
      return { text: content, mimeType };
    },
  };
}
