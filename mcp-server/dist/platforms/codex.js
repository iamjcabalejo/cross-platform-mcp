import path from "node:path";
import fs from "node:fs";
import { getCodexPaths, readFileSafe, listDirSafe, } from "../config.js";
import { configUri } from "./types.js";
const MIME_MARKDOWN = "text/markdown";
const MIME_PLAIN = "text/plain";
/** Codex: skills are in .agents/skills (repo) and $CODEX_HOME/skills (user). No plugin.json; manifest is empty. */
function loadCodexManifest() {
    return {
        commands: [],
        agents: [],
        skills: [],
        rules: [],
    };
}
function listSkillsInDir(skillsDir, prefix) {
    const names = listDirSafe(skillsDir).filter((name) => {
        if (name.startsWith("."))
            return false;
        const skillPath = path.join(skillsDir, name);
        try {
            return fs.statSync(skillPath).isDirectory() && fs.existsSync(path.join(skillPath, "SKILL.md"));
        }
        catch {
            return false;
        }
    });
    return names.map((name) => ({
        uri: configUri("codex", "skill", prefix ? `${prefix}/${name}` : name),
        name,
        description: undefined,
        mimeType: MIME_MARKDOWN,
    }));
}
function listSkillsRes() {
    const paths = getCodexPaths();
    const repo = listSkillsInDir(paths.agentsSkillsDir, "");
    const user = listSkillsInDir(paths.userSkillsDir, "user");
    const seen = new Set();
    const out = [];
    for (const r of [...repo, ...user]) {
        const key = r.uri;
        if (seen.has(key))
            continue;
        seen.add(key);
        out.push(r);
    }
    return out;
}
function listRulesRes() {
    const paths = getCodexPaths();
    const files = listDirSafe(paths.rulesDir).filter((n) => n.endsWith(".rules"));
    return files.map((file) => {
        const name = file.replace(/\.rules$/, "");
        return {
            uri: configUri("codex", "rule", name),
            name,
            description: `Codex rule: ${name}`,
            mimeType: MIME_PLAIN,
        };
    });
}
function listAgentsRes() {
    const paths = getCodexPaths();
    const content = readFileSafe(paths.agentsMdPath);
    if (!content)
        return [];
    return [
        {
            uri: configUri("codex", "agent", "AGENTS.md"),
            name: "AGENTS.md",
            description: "Codex project/global instructions (AGENTS.md)",
            mimeType: MIME_MARKDOWN,
        },
    ];
}
export function createCodexBackend() {
    return {
        platform: "codex",
        hasPaths() {
            const paths = getCodexPaths();
            const hasRepoSkills = listDirSafe(paths.agentsSkillsDir).length > 0;
            const hasUserSkills = listDirSafe(paths.userSkillsDir).length > 0;
            const hasRules = listDirSafe(paths.rulesDir).filter((n) => n.endsWith(".rules")).length > 0;
            const hasAgents = readFileSafe(paths.agentsMdPath) !== null;
            return hasRepoSkills || hasUserSkills || hasRules || hasAgents;
        },
        loadManifest() {
            return loadCodexManifest();
        },
        listResources() {
            return [...listSkillsRes(), ...listRulesRes(), ...listAgentsRes()];
        },
        readResource(uri) {
            const paths = getCodexPaths();
            const platform = uri.hostname;
            if (platform !== "codex") {
                return { error: `Expected config://codex/... got ${uri.href}` };
            }
            const pathname = uri.pathname.replace(/^\/+/, "");
            const parts = pathname.split("/");
            const category = parts[0];
            const id = decodeURIComponent(parts.slice(1).join("/"));
            if (!category || !id) {
                return { error: "Invalid URI: expected config://codex/{category}/{id}" };
            }
            let filePath = null;
            let mimeType = MIME_MARKDOWN;
            switch (category) {
                case "skill": {
                    if (id.startsWith("user/")) {
                        const name = id.slice("user/".length);
                        filePath = path.join(paths.userSkillsDir, name, "SKILL.md");
                    }
                    else {
                        filePath = path.join(paths.agentsSkillsDir, id, "SKILL.md");
                    }
                    break;
                }
                case "rule":
                    filePath = path.join(paths.rulesDir, `${id}.rules`);
                    mimeType = MIME_PLAIN;
                    break;
                case "agent":
                    if (id === "AGENTS.md") {
                        filePath = paths.agentsMdPath;
                    }
                    else {
                        return { error: `Unknown agent id: ${id}` };
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
//# sourceMappingURL=codex.js.map