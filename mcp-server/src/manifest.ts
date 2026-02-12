import type { CursorPaths } from "./config.js";
import type { ClaudePaths } from "./config.js";
import { readFileSafe } from "./config.js";

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

const EMPTY_MANIFEST: PluginManifest = {
  commands: [],
  agents: [],
  skills: [],
  rules: [],
};

/**
 * Load plugin.json from a given path. Returns empty arrays on parse error or missing file.
 */
function loadManifestFromPath(pluginJsonPath: string): PluginManifest {
  const raw = readFileSafe(pluginJsonPath);
  if (!raw) return EMPTY_MANIFEST;

  try {
    const data = JSON.parse(raw) as {
      commands?: ManifestItem[];
      agents?: ManifestItem[];
      skills?: ManifestItem[];
      rules?: ManifestItem[];
    };
    return {
      commands: Array.isArray(data.commands) ? data.commands : [],
      agents: Array.isArray(data.agents) ? data.agents : [],
      skills: Array.isArray(data.skills) ? data.skills : [],
      rules: Array.isArray(data.rules) ? data.rules : [],
    };
  } catch {
    return EMPTY_MANIFEST;
  }
}

/**
 * Load Cursor plugin.json and parse commands, agents, skills, rules.
 */
export function loadManifest(paths: CursorPaths): PluginManifest {
  return loadManifestFromPath(paths.pluginJsonPath);
}

/**
 * Load Claude plugin.json (same shape as Cursor).
 */
export function loadClaudeManifest(paths: ClaudePaths): PluginManifest {
  return loadManifestFromPath(paths.pluginJsonPath);
}

/** Normalize path to command id (strip .cursor/commands/ or .claude/commands/ and .md). */
function commandIdFromPath(prefix: string, pathStr: string): string {
  return pathStr.replace(new RegExp(`^${prefix}`), "").replace(/\.md$/, "");
}

/**
 * Get description for a command by id (e.g. "misc/feature-plan") or path.
 */
export function getCommandDescription(
  manifest: PluginManifest,
  idOrPath: string,
  pathPrefix = ".cursor/commands/"
): string | undefined {
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
export function getAgentDescription(manifest: PluginManifest, name: string): string | undefined {
  return manifest.agents.find((a) => a.name === name)?.description;
}

/**
 * Get description for a skill by name.
 */
export function getSkillDescription(manifest: PluginManifest, name: string): string | undefined {
  return manifest.skills.find((s) => s.name === name)?.description;
}

/**
 * Get description for a rule by name.
 */
export function getRuleDescription(manifest: PluginManifest, name: string): string | undefined {
  return manifest.rules.find((r) => r.name === name)?.description;
}
