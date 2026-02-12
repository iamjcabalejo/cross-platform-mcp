import { CONFIG_SCHEME } from "./types.js";
import { createCursorBackend } from "./cursor.js";
import { createClaudeBackend } from "./claude.js";
import { createCodexBackend } from "./codex.js";
const BACKENDS = [
    createCursorBackend(),
    createClaudeBackend(),
    createCodexBackend(),
];
/**
 * Returns all backends that have config present (e.g. .cursor, .claude, or Codex paths).
 */
export function getActiveBackends() {
    return BACKENDS.filter((b) => b.hasPaths());
}
/**
 * List resources from all active platforms. URIs use config://{platform}/{category}/{id}.
 */
export function listAllResources() {
    const resources = [];
    for (const backend of getActiveBackends()) {
        const manifest = backend.loadManifest();
        resources.push(...backend.listResources(manifest));
    }
    return { resources };
}
/**
 * Read a resource by URI. URI must be config://{platform}/{category}/{id}.
 */
export function readResource(uriObj) {
    const scheme = uriObj.protocol.replace(/:$/, "");
    if (scheme !== CONFIG_SCHEME) {
        return {
            contents: [
                {
                    uri: uriObj.href,
                    mimeType: "text/plain",
                    text: `Unsupported URI scheme: ${scheme}. Use config://{platform}/{category}/{id}.`,
                },
            ],
        };
    }
    const platform = uriObj.hostname;
    const backend = BACKENDS.find((b) => b.platform === platform);
    if (!backend) {
        return {
            contents: [
                {
                    uri: uriObj.href,
                    mimeType: "text/plain",
                    text: `Unknown platform: ${platform}. Supported: cursor, claude, codex.`,
                },
            ],
        };
    }
    const result = backend.readResource(uriObj);
    if ("error" in result) {
        return {
            contents: [{ uri: uriObj.href, mimeType: "text/plain", text: result.error }],
        };
    }
    return {
        contents: [{ uri: uriObj.href, mimeType: result.mimeType, text: result.text }],
    };
}
//# sourceMappingURL=index.js.map