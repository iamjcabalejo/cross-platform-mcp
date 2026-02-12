import { readFileSafe } from "./config.js";
const EMPTY_MANIFEST = {
    commands: [],
    agents: [],
    skills: [],
    rules: [],
};
/**
 * Load plugin.json from a given path. Returns empty arrays on parse error or missing file.
 */
function loadManifestFromPath(pluginJsonPath) {
    const raw = readFileSafe(pluginJsonPath);
    if (!raw)
        return EMPTY_MANIFEST;
    try {
        const data = JSON.parse(raw);
        return {
            commands: Array.isArray(data.commands) ? data.commands : [],
            agents: Array.isArray(data.agents) ? data.agents : [],
            skills: Array.isArray(data.skills) ? data.skills : [],
            rules: Array.isArray(data.rules) ? data.rules : [],
        };
    }
    catch {
        return EMPTY_MANIFEST;
    }
}
/**
 * Load Cursor plugin.json and parse commands, agents, skills, rules.
 */
export function loadManifest(paths) {
    return loadManifestFromPath(paths.pluginJsonPath);
}
/**
 * Load Claude plugin.json (same shape as Cursor).
 */
export function loadClaudeManifest(paths) {
    return loadManifestFromPath(paths.pluginJsonPath);
}
/** Normalize path to command id (strip .cursor/commands/ or .claude/commands/ and .md). */
function commandIdFromPath(prefix, pathStr) {
    return pathStr.replace(new RegExp(`^${prefix}`), "").replace(/\.md$/, "");
}
/**
 * Get description for a command by id (e.g. "misc/feature-plan") or path.
 */
export function getCommandDescription(manifest, idOrPath, pathPrefix = ".cursor/commands/") {
    const normalized = commandIdFromPath(pathPrefix, idOrPath);
    const item = manifest.commands.find((c) => {
        const cmdId = commandIdFromPath(pathPrefix, c.path);
        return c.name === idOrPath || cmdId === normalized;
    });
    return item?.description;
}
/**
 * Get description for an agent by name.
 */
export function getAgentDescription(manifest, name) {
    return manifest.agents.find((a) => a.name === name)?.description;
}
/**
 * Get description for a skill by name.
 */
export function getSkillDescription(manifest, name) {
    return manifest.skills.find((s) => s.name === name)?.description;
}
/**
 * Get description for a rule by name.
 */
export function getRuleDescription(manifest, name) {
    return manifest.rules.find((r) => r.name === name)?.description;
}
//# sourceMappingURL=manifest.js.map