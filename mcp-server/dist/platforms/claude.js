import path from "node:path";
import fs from "node:fs";
import { getClaudePaths, hasClaudeDir, readFileSafe, listDirSafe, findMarkdownIds, } from "../config.js";
import { loadClaudeManifest, getCommandDescription, getAgentDescription, getSkillDescription, getRuleDescription, } from "../manifest.js";
import { configUri } from "./types.js";
const MIME_MARKDOWN = "text/markdown";
const MIME_PLAIN = "text/plain";
const CLAUDE_COMMANDS_PREFIX = ".claude/commands/";
function listCommandsRes(manifest) {
    const paths = getClaudePaths();
    const ids = findMarkdownIds(paths.commandsDir);
    return ids.map((id) => {
        const description = getCommandDescription(manifest, id, CLAUDE_COMMANDS_PREFIX);
        return {
            uri: configUri("claude", "command", id),
            name: id.split("/").pop() ?? id,
            description: description ?? undefined,
            mimeType: MIME_MARKDOWN,
        };
    });
}
function listSkillsRes(manifest) {
    const paths = getClaudePaths();
    const names = listDirSafe(paths.skillsDir).filter((name) => {
        const skillPath = path.join(paths.skillsDir, name);
        try {
            return fs.statSync(skillPath).isDirectory() && fs.existsSync(path.join(skillPath, "SKILL.md"));
        }
        catch {
            return false;
        }
    });
    return names.map((name) => {
        const description = getSkillDescription(manifest, name);
        return {
            uri: configUri("claude", "skill", name),
            name,
            description: description ?? undefined,
            mimeType: MIME_MARKDOWN,
        };
    });
}
function listAgentsRes(manifest) {
    const paths = getClaudePaths();
    const files = listDirSafe(paths.agentsDir).filter((n) => n.endsWith(".md"));
    return files.map((file) => {
        const name = file.replace(/\.md$/, "");
        const description = getAgentDescription(manifest, name);
        return {
            uri: configUri("claude", "agent", name),
            name,
            description: description ?? undefined,
            mimeType: MIME_MARKDOWN,
        };
    });
}
function listRulesRes(manifest) {
    const paths = getClaudePaths();
    const files = listDirSafe(paths.rulesDir).filter((n) => n.endsWith(".mdc") || n.endsWith(".md"));
    return files.map((file) => {
        const name = file.replace(/\.mdc$/, "").replace(/\.md$/, "");
        const description = getRuleDescription(manifest, name);
        return {
            uri: configUri("claude", "rule", name),
            name,
            description: description ?? undefined,
            mimeType: MIME_MARKDOWN,
        };
    });
}
export function createClaudeBackend() {
    return {
        platform: "claude",
        hasPaths() {
            const paths = getClaudePaths();
            return hasClaudeDir(paths.root);
        },
        loadManifest() {
            return loadClaudeManifest(getClaudePaths());
        },
        listResources(manifest) {
            return [
                ...listCommandsRes(manifest),
                ...listSkillsRes(manifest),
                ...listAgentsRes(manifest),
                ...listRulesRes(manifest),
            ];
        },
        readResource(uri) {
            const paths = getClaudePaths();
            if (!hasClaudeDir(paths.root)) {
                return { error: "Claude config root not found (.claude missing)." };
            }
            const platform = uri.hostname;
            if (platform !== "claude") {
                return { error: `Expected config://claude/... got ${uri.href}` };
            }
            const pathname = uri.pathname.replace(/^\/+/, "");
            const parts = pathname.split("/");
            const category = parts[0];
            const id = decodeURIComponent(parts.slice(1).join("/"));
            if (!category || !id) {
                return { error: "Invalid URI: expected config://claude/{category}/{id}" };
            }
            let filePath = null;
            const mimeType = MIME_MARKDOWN;
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
                case "rule": {
                    const mdc = path.join(paths.rulesDir, `${id}.mdc`);
                    const md = path.join(paths.rulesDir, `${id}.md`);
                    filePath = readFileSafe(mdc) !== null ? mdc : readFileSafe(md) !== null ? md : null;
                    break;
                }
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
//# sourceMappingURL=claude.js.map