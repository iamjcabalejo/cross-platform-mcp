/**
 * Resolves the config root: CONFIG_PATH, then CURSOR_CONFIG_PATH, then process.cwd().
 * Used as default for all platforms when platform-specific env is not set.
 */
export declare function getConfigRoot(): string;
/**
 * Config root for a given platform. Uses platform-specific env if set, else CONFIG_PATH / cwd.
 */
export declare function getConfigRootForPlatform(platform: "cursor" | "claude" | "codex"): string;
/** Codex user/home directory (e.g. ~/.codex). Used for user-level skills. */
export declare function getCodexHome(): string;
/**
 * Path to the .cursor directory under config root.
 */
export declare function getCursorDir(configRoot: string): string;
export declare function getClaudeDir(configRoot: string): string;
export declare function getCodexDir(configRoot: string): string;
/**
 * Whether .cursor exists and is a directory.
 */
export declare function hasCursorDir(configRoot: string): boolean;
export declare function hasClaudeDir(configRoot: string): boolean;
export declare function hasCodexDir(configRoot: string): boolean;
/** .agents/skills under config root (Codex repo skills). */
export declare function getAgentsSkillsDir(configRoot: string): string;
export interface CursorPaths {
    root: string;
    cursorDir: string;
    commandsDir: string;
    agentsDir: string;
    skillsDir: string;
    rulesDir: string;
    hooksDir: string;
    hooksJsonPath: string;
    pluginJsonPath: string;
}
export interface ClaudePaths {
    root: string;
    claudeDir: string;
    commandsDir: string;
    agentsDir: string;
    skillsDir: string;
    rulesDir: string;
    pluginJsonPath: string;
}
export interface CodexPaths {
    root: string;
    codexDir: string;
    rulesDir: string;
    agentsSkillsDir: string;
    userSkillsDir: string;
    agentsMdPath: string;
}
/**
 * Returns all paths used by the server for Cursor. Does not validate existence.
 */
export declare function getCursorPaths(): CursorPaths;
export declare function getClaudePaths(): ClaudePaths;
export declare function getCodexPaths(): CodexPaths;
/**
 * Safe read of a file; returns null on any error.
 */
export declare function readFileSafe(filePath: string): string | null;
/**
 * List direct children (files or dirs) in a directory; returns [] if not a directory or on error.
 */
export declare function listDirSafe(dirPath: string): string[];
/**
 * Recursively find all .md files under dir, relative to dir (without .md).
 */
export declare function findMarkdownIds(dirPath: string, baseDir?: string): string[];
//# sourceMappingURL=config.d.ts.map