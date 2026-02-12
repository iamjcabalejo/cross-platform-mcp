import type { Resource } from "@modelcontextprotocol/sdk/types.js";
/**
 * Supported AI coding environments. Each has its own directory layout and conventions.
 */
export type Platform = "cursor" | "claude" | "codex" | "copilot";
export type Category = "command" | "skill" | "agent" | "rule" | "hook";
/** Resource URI scheme: config://{platform}/{category}/{id} */
export declare const CONFIG_SCHEME = "config";
export declare function configUri(platform: Platform, category: Category, id: string): string;
export interface ManifestItem {
    name: string;
    path: string;
    description?: string;
}
export interface PlatformManifest {
    commands: ManifestItem[];
    agents: ManifestItem[];
    skills: ManifestItem[];
    rules: ManifestItem[];
}
/** Result of listing or reading from a single platform; may be empty if platform not present. */
export interface BackendResult {
    platform: Platform;
    resources: Resource[];
    manifest: PlatformManifest;
}
/** Backend that can list and read resources for one platform. */
export interface PlatformBackend {
    platform: Platform;
    /** Paths present (e.g. .cursor exists). */
    hasPaths(): boolean;
    /** Load manifest (from plugin.json or filesystem). */
    loadManifest(): PlatformManifest;
    /** List all resources for this platform. */
    listResources(manifest: PlatformManifest): Resource[];
    /** Read one resource by URI; returns content or error text. */
    readResource(uri: URL): {
        text: string;
        mimeType: string;
    } | {
        error: string;
    };
}
//# sourceMappingURL=types.d.ts.map