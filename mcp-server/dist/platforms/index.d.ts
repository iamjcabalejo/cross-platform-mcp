import type { ListResourcesResult, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import type { PlatformBackend } from "./types.js";
/**
 * Returns all backends that have config present (e.g. .cursor, .claude, or Codex paths).
 */
export declare function getActiveBackends(): PlatformBackend[];
/**
 * List resources from all active platforms. URIs use config://{platform}/{category}/{id}.
 */
export declare function listAllResources(): ListResourcesResult;
/**
 * Read a resource by URI. URI must be config://{platform}/{category}/{id}.
 */
export declare function readResource(uriObj: URL): ReadResourceResult;
export type { Platform, Category, PlatformManifest } from "./types.js";
//# sourceMappingURL=index.d.ts.map