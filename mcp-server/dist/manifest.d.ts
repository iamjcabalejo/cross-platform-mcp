import type { CursorPaths } from "./config.js";
import type { ClaudePaths } from "./config.js";
export interface ManifestItem {
    name: string;
    path: string;
    description?: string;
}
export interface PluginManifest {
    commands: ManifestItem[];
    agents: ManifestItem[];
    skills: ManifestItem[];
    rules: ManifestItem[];
}
/**
 * Load Cursor plugin.json and parse commands, agents, skills, rules.
 */
export declare function loadManifest(paths: CursorPaths): PluginManifest;
/**
 * Load Claude plugin.json (same shape as Cursor).
 */
export declare function loadClaudeManifest(paths: ClaudePaths): PluginManifest;
/**
 * Get description for a command by id (e.g. "misc/feature-plan") or path.
 */
export declare function getCommandDescription(manifest: PluginManifest, idOrPath: string, pathPrefix?: string): string | undefined;
/**
 * Get description for an agent by name.
 */
export declare function getAgentDescription(manifest: PluginManifest, name: string): string | undefined;
/**
 * Get description for a skill by name.
 */
export declare function getSkillDescription(manifest: PluginManifest, name: string): string | undefined;
/**
 * Get description for a rule by name.
 */
export declare function getRuleDescription(manifest: PluginManifest, name: string): string | undefined;
//# sourceMappingURL=manifest.d.ts.map