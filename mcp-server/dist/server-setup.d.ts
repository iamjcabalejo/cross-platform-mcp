import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
declare const SERVER_NAME = "config-mcp";
declare const SERVER_VERSION = "2.0.0";
/**
 * Creates and returns an MCP server that exposes commands, skills, agents, rules, and hooks
 * from all detected platforms (Cursor, Claude Code, Codex). Works across Cursor, Claude, and Codex clients.
 */
export declare function createConfigServer(): McpServer;
export { SERVER_NAME, SERVER_VERSION };
//# sourceMappingURL=server-setup.d.ts.map