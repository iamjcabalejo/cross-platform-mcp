import type { Platform } from "./platforms/index.js";
import { listAllResources, readResource } from "./resources.js";

export interface ListItem {
  platform: Platform;
  uri: string;
  name: string;
  description?: string;
}

export interface GetResult {
  platform: Platform;
  id: string;
  name: string;
  content: string;
}

function filterByCategory(category: string): ListItem[] {
  const { resources } = listAllResources();
  const prefix = `config://`;
  return resources
    .filter((r) => {
      const rest = r.uri.slice(prefix.length);
      const parts = rest.split("/");
      return parts[0] && parts[1] === category;
    })
    .map((r) => {
      const rest = r.uri.slice(prefix.length);
      const [platform, , ...idParts] = rest.split("/");
      const id = idParts.map(decodeURIComponent).join("/");
      return {
        platform: platform as Platform,
        uri: r.uri,
        name: r.name ?? id.split("/").pop() ?? id,
        description: r.description,
      };
    });
}

export function listCommands(): ListItem[] {
  return filterByCategory("command");
}

export function listAgents(): ListItem[] {
  return filterByCategory("agent");
}

export function listSkills(): ListItem[] {
  return filterByCategory("skill");
}

export function listRules(): ListItem[] {
  return filterByCategory("rule");
}

export function listHooks(): ListItem[] {
  return filterByCategory("hook");
}

function getByUri(uriStr: string): GetResult | { error: string } {
  const result = readResource(new URL(uriStr));
  const first = result.contents?.[0];
  if (!first || !("text" in first)) {
    return { error: "Resource not found or empty." };
  }
  const match = /^config:\/\/([^/]+)\/([^/]+)\/(.+)$/.exec(uriStr);
  const platform = (match?.[1] ?? "cursor") as Platform;
  const id = match?.[3] ? decodeURIComponent(match[3]) : "";
  const name = id.split("/").pop() ?? id;
  return { platform, id, name, content: first.text };
}

/** Extract resource id from config://platform/category/id URI (id may contain slashes). */
function idFromUri(uri: string): string {
  const afterScheme = uri.replace(/^[^:]+:\/\//, "");
  const parts = afterScheme.split("/");
  if (parts.length < 3) return "";
  return decodeURIComponent(parts.slice(2).join("/"));
}

/**
 * Resolve resource by id and optional platform. If platform omitted, uses first platform that has the resource.
 */
function resolveUri(
  category: string,
  id: string,
  platform?: Platform
): string | { error: string } {
  const items = filterByCategory(category);
  const normalizedId = id.replace(/\.md$/, "").replace(/\.mdc$/, "").replace(/\.sh$/, "");
  const match = platform
    ? items.find((i) => i.platform === platform && idFromUri(i.uri) === normalizedId)
    : items.find((i) => idFromUri(i.uri) === normalizedId);
  if (!match) {
    const platforms = [...new Set(items.map((i) => i.platform))].join(", ");
    return { error: `No ${category} with id '${id}' found. Available platforms: ${platforms || "none"}.` };
  }
  return match.uri;
}

export function getCommand(id: string, platform?: Platform): GetResult | { error: string } {
  const uriOrErr = resolveUri("command", id, platform);
  if (typeof uriOrErr !== "string") return uriOrErr;
  return getByUri(uriOrErr);
}

export function getAgent(id: string, platform?: Platform): GetResult | { error: string } {
  const uriOrErr = resolveUri("agent", id, platform);
  if (typeof uriOrErr !== "string") return uriOrErr;
  return getByUri(uriOrErr);
}

export function getSkill(id: string, platform?: Platform): GetResult | { error: string } {
  const uriOrErr = resolveUri("skill", id, platform);
  if (typeof uriOrErr !== "string") return uriOrErr;
  return getByUri(uriOrErr);
}

export function getRule(id: string, platform?: Platform): GetResult | { error: string } {
  const uriOrErr = resolveUri("rule", id, platform);
  if (typeof uriOrErr !== "string") return uriOrErr;
  return getByUri(uriOrErr);
}

export function getHook(id: string, platform?: Platform): GetResult | { error: string } {
  const uriOrErr = resolveUri("hook", id, platform ?? "cursor");
  if (typeof uriOrErr !== "string") return uriOrErr;
  return getByUri(uriOrErr);
}
