import type { ListResourcesResult, ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { listAllResources as listAllFromPlatforms, readResource as readFromPlatforms } from "./platforms/index.js";

/**
 * List all resources from every active platform (Cursor, Claude, Codex, GitHub Copilot).
 * URIs use config://{platform}/{category}/{id}.
 */
export function listAllResources(): ListResourcesResult {
  return listAllFromPlatforms();
}

/**
 * Normalize legacy cursor-config://category/id to config://cursor/category/id for backward compatibility.
 */
function normalizeUri(uriObj: URL): URL {
  const protocol = uriObj.protocol.replace(/:$/, "");
  if (protocol === "cursor-config") {
    const category = uriObj.hostname;
    const id = uriObj.pathname.replace(/^\/+/, "");
    return new URL(`config://cursor/${category}/${id}`);
  }
  return uriObj;
}

/**
 * Read a resource by URI. Supports config://{platform}/{category}/{id} and legacy cursor-config://{category}/{id}.
 */
export function readResource(uriObj: URL): ReadResourceResult {
  return readFromPlatforms(normalizeUri(uriObj));
}
