import path from "node:path";
import fs from "node:fs";

const CURSOR_DIR = ".cursor";
const CLAUDE_DIR = ".claude";
const CODEX_DIR = ".codex";
const AGENTS_DIR = ".agents";
const GITHUB_DIR = ".github";

/** CONFIG_PATH: single root for all platforms; fallback for platform-specific env. */
const CONFIG_PATH_ENV = "CONFIG_PATH";
const CURSOR_CONFIG_PATH_ENV = "CURSOR_CONFIG_PATH";
const CLAUDE_CONFIG_PATH_ENV = "CLAUDE_CONFIG_PATH";
const CODEX_CONFIG_PATH_ENV = "CODEX_CONFIG_PATH";
const COPILOT_CONFIG_PATH_ENV = "COPILOT_CONFIG_PATH";
const CODEX_HOME_ENV = "CODEX_HOME";

/**
 * Resolves the config root: CONFIG_PATH, then CURSOR_CONFIG_PATH, then process.cwd().
 * Used as default for all platforms when platform-specific env is not set.
 */
export function getConfigRoot(): string {
  const env =
    process.env[CONFIG_PATH_ENV] ??
    process.env[CURSOR_CONFIG_PATH_ENV];
  if (env) {
    return path.resolve(env);
  }
  return process.cwd();
}

/**
 * Config root for a given platform. Uses platform-specific env if set, else CONFIG_PATH / cwd.
 */
export function getConfigRootForPlatform(platform: "cursor" | "claude" | "codex" | "copilot"): string {
  switch (platform) {
    case "cursor": {
      const env = process.env[CURSOR_CONFIG_PATH_ENV] ?? process.env[CONFIG_PATH_ENV];
      return env ? path.resolve(env) : process.cwd();
    }
    case "claude": {
      const env = process.env[CLAUDE_CONFIG_PATH_ENV] ?? process.env[CONFIG_PATH_ENV];
      return env ? path.resolve(env) : process.cwd();
    }
    case "codex": {
      const env = process.env[CODEX_CONFIG_PATH_ENV] ?? process.env[CONFIG_PATH_ENV];
      return env ? path.resolve(env) : process.cwd();
    }
    case "copilot": {
      const env = process.env[COPILOT_CONFIG_PATH_ENV] ?? process.env[CONFIG_PATH_ENV];
      return env ? path.resolve(env) : process.cwd();
    }
    default:
      return getConfigRoot();
  }
}

/** Codex user/home directory (e.g. ~/.codex). Used for user-level skills. */
export function getCodexHome(): string {
  const env = process.env[CODEX_HOME_ENV];
  if (env) return path.resolve(env);
  const home = process.env.HOME ?? process.env.USERPROFILE ?? "";
  return home ? path.join(home, CODEX_DIR) : path.join(process.cwd(), CODEX_DIR);
}

/**
 * Path to the .cursor directory under config root.
 */
export function getCursorDir(configRoot: string): string {
  return path.join(configRoot, CURSOR_DIR);
}

export function getClaudeDir(configRoot: string): string {
  return path.join(configRoot, CLAUDE_DIR);
}

export function getCodexDir(configRoot: string): string {
  return path.join(configRoot, CODEX_DIR);
}

/** Path to .github directory (GitHub Copilot custom agents live under .github/agents). */
export function getGitHubDir(configRoot: string): string {
  return path.join(configRoot, GITHUB_DIR);
}

/**
 * Whether a directory exists and is a directory.
 */
function dirExists(dirPath: string): boolean {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Whether .cursor exists and is a directory.
 */
export function hasCursorDir(configRoot: string): boolean {
  return dirExists(getCursorDir(configRoot));
}

export function hasClaudeDir(configRoot: string): boolean {
  return dirExists(getClaudeDir(configRoot));
}

export function hasCodexDir(configRoot: string): boolean {
  return dirExists(getCodexDir(configRoot));
}

/** Whether .github/agents exists and is a directory (GitHub Copilot custom agents). */
export function hasCopilotAgentsDir(configRoot: string): boolean {
  return dirExists(path.join(getGitHubDir(configRoot), "agents"));
}

/** .agents/skills under config root (Codex repo skills). */
export function getAgentsSkillsDir(configRoot: string): string {
  return path.join(configRoot, AGENTS_DIR, "skills");
}

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

export interface CopilotPaths {
  root: string;
  githubDir: string;
  agentsDir: string;
}

/**
 * Returns all paths used by the server for Cursor. Does not validate existence.
 */
export function getCursorPaths(): CursorPaths {
  const root = getConfigRootForPlatform("cursor");
  const cursorDir = getCursorDir(root);
  return {
    root,
    cursorDir,
    commandsDir: path.join(cursorDir, "commands"),
    agentsDir: path.join(cursorDir, "agents"),
    skillsDir: path.join(cursorDir, "skills"),
    rulesDir: path.join(cursorDir, "rules"),
    hooksDir: path.join(cursorDir, "hooks"),
    hooksJsonPath: path.join(cursorDir, "hooks.json"),
    pluginJsonPath: path.join(root, ".cursor-plugin", "plugin.json"),
  };
}

export function getClaudePaths(): ClaudePaths {
  const root = getConfigRootForPlatform("claude");
  const claudeDir = getClaudeDir(root);
  return {
    root,
    claudeDir,
    commandsDir: path.join(claudeDir, "commands"),
    agentsDir: path.join(claudeDir, "agents"),
    skillsDir: path.join(claudeDir, "skills"),
    rulesDir: path.join(claudeDir, "rules"),
    pluginJsonPath: path.join(root, ".claude-plugin", "plugin.json"),
  };
}

export function getCodexPaths(): CodexPaths {
  const root = getConfigRootForPlatform("codex");
  const codexDir = getCodexDir(root);
  const codexHome = getCodexHome();
  return {
    root,
    codexDir,
    rulesDir: path.join(codexDir, "rules"),
    agentsSkillsDir: getAgentsSkillsDir(root),
    userSkillsDir: path.join(codexHome, "skills"),
    agentsMdPath: path.join(root, "AGENTS.md"),
  };
}

export function getCopilotPaths(): CopilotPaths {
  const root = getConfigRootForPlatform("copilot");
  const githubDir = getGitHubDir(root);
  return {
    root,
    githubDir,
    agentsDir: path.join(githubDir, "agents"),
  };
}

/**
 * Safe read of a file; returns null on any error.
 */
export function readFileSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

/**
 * List direct children (files or dirs) in a directory; returns [] if not a directory or on error.
 */
export function listDirSafe(dirPath: string): string[] {
  try {
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      return [];
    }
    return fs.readdirSync(dirPath);
  } catch {
    return [];
  }
}

/**
 * Recursively find all .md files under dir, relative to dir (without .md).
 */
export function findMarkdownIds(dirPath: string, baseDir: string = dirPath): string[] {
  const ids: string[] = [];
  const names = listDirSafe(dirPath);
  for (const name of names) {
    const full = path.join(dirPath, name);
    let stat: fs.Stats;
    try {
      stat = fs.statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      ids.push(...findMarkdownIds(full, baseDir));
    } else if (stat.isFile() && name.endsWith(".md")) {
      const relative = path.relative(baseDir, full).replace(/\.md$/, "").replace(/\\/g, "/");
      ids.push(relative);
    }
  }
  return ids;
}
