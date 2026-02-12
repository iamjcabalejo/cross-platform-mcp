import { listAllResources, readResource } from "./resources.js";
function filterByCategory(category) {
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
            platform: platform,
            uri: r.uri,
            name: r.name ?? id.split("/").pop() ?? id,
            description: r.description,
        };
    });
}
export function listCommands() {
    return filterByCategory("command");
}
export function listAgents() {
    return filterByCategory("agent");
}
export function listSkills() {
    return filterByCategory("skill");
}
export function listRules() {
    return filterByCategory("rule");
}
export function listHooks() {
    return filterByCategory("hook");
}
function getByUri(uriStr) {
    const result = readResource(new URL(uriStr));
    const first = result.contents?.[0];
    if (!first || !("text" in first)) {
        return { error: "Resource not found or empty." };
    }
    const match = /^config:\/\/([^/]+)\/([^/]+)\/(.+)$/.exec(uriStr);
    const platform = (match?.[1] ?? "cursor");
    const id = match?.[3] ? decodeURIComponent(match[3]) : "";
    const name = id.split("/").pop() ?? id;
    return { platform, id, name, content: first.text };
}
/** Extract resource id from config://platform/category/id URI (id may contain slashes). */
function idFromUri(uri) {
    const afterScheme = uri.replace(/^[^:]+:\/\//, "");
    const parts = afterScheme.split("/");
    if (parts.length < 3)
        return "";
    return decodeURIComponent(parts.slice(2).join("/"));
}
/**
 * Resolve resource by id and optional platform. If platform omitted, uses first platform that has the resource.
 */
function resolveUri(category, id, platform) {
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
export function getCommand(id, platform) {
    const uriOrErr = resolveUri("command", id, platform);
    if (typeof uriOrErr !== "string")
        return uriOrErr;
    return getByUri(uriOrErr);
}
export function getAgent(id, platform) {
    const uriOrErr = resolveUri("agent", id, platform);
    if (typeof uriOrErr !== "string")
        return uriOrErr;
    return getByUri(uriOrErr);
}
export function getSkill(id, platform) {
    const uriOrErr = resolveUri("skill", id, platform);
    if (typeof uriOrErr !== "string")
        return uriOrErr;
    return getByUri(uriOrErr);
}
export function getRule(id, platform) {
    const uriOrErr = resolveUri("rule", id, platform);
    if (typeof uriOrErr !== "string")
        return uriOrErr;
    return getByUri(uriOrErr);
}
export function getHook(id, platform) {
    const uriOrErr = resolveUri("hook", id, platform ?? "cursor");
    if (typeof uriOrErr !== "string")
        return uriOrErr;
    return getByUri(uriOrErr);
}
//# sourceMappingURL=tools.js.map