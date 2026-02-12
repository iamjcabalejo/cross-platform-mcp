import type { ListResourcesResult, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
/**
 * List all resources from every active platform (Cursor, Claude, Codex, GitHub Copilot).
 * URIs use config://{platform}/{category}/{id}.
 */
export declare function listAllResources(): ListResourcesResult;
/**
 * Read a resource by URI. Supports config://{platform}/{category}/{id} and legacy cursor-config://{category}/{id}.
 */
export declare function readResource(uriObj: URL): ReadResourceResult;
//# sourceMappingURL=resources.d.ts.map