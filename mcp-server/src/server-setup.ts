import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listAllResources, readResource } from "./resources.js";
import {
  listCommands,
  listAgents,
  listSkills,
  listRules,
  listHooks,
  getCommand,
  getAgent,
  getSkill,
  getRule,
  getHook,
} from "./tools.js";

const SERVER_NAME = "config-mcp";
const SERVER_VERSION = "2.0.0";

/**
 * Creates and returns an MCP server that exposes commands, skills, agents, rules, and hooks
 * from all detected platforms (Cursor, Claude Code, Codex). Works across Cursor, Claude, and Codex clients.
 */
export function createConfigServer(): McpServer {
  const mcp = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      capabilities: {
        resources: { listChanged: true },
        tools: { listChanged: true },
      },
    }
  );

  const template = new ResourceTemplate("config://{platform}/{category}/{id}", {
    list: async () => listAllResources(),
  });

  mcp.registerResource(
    "config",
    template,
    {
      description: "Commands, skills, agents, rules, and hooks from Cursor, Claude Code, and Codex",
      mimeType: "text/markdown",
    },
    (uri: URL) => readResource(uri)
  );

  const idParam = z.object({
    id: z.string().describe("Resource id (e.g. misc/feature-plan, backend-architect)"),
    platform: z
      .enum(["cursor", "claude", "codex"])
      .optional()
      .describe("Optional: cursor, claude, or codex. If omitted, first matching resource is returned."),
  });

  mcp.registerTool(
    "list_commands",
    { description: "List all commands (slash commands) from Cursor and Claude Code.", inputSchema: z.object({}) },
    async () => ({ content: [{ type: "text", text: JSON.stringify(listCommands(), null, 2) }] })
  );
  mcp.registerTool(
    "list_agents",
    { description: "List all agents from Cursor, Claude Code, and Codex (e.g. AGENTS.md).", inputSchema: z.object({}) },
    async () => ({ content: [{ type: "text", text: JSON.stringify(listAgents(), null, 2) }] })
  );
  mcp.registerTool(
    "list_skills",
    { description: "List all skills from Cursor, Claude Code, and Codex.", inputSchema: z.object({}) },
    async () => ({ content: [{ type: "text", text: JSON.stringify(listSkills(), null, 2) }] })
  );
  mcp.registerTool(
    "list_rules",
    { description: "List all rules from Cursor, Claude Code, and Codex.", inputSchema: z.object({}) },
    async () => ({ content: [{ type: "text", text: JSON.stringify(listRules(), null, 2) }] })
  );
  mcp.registerTool(
    "list_hooks",
    { description: "List hook scripts and config (Cursor).", inputSchema: z.object({}) },
    async () => ({ content: [{ type: "text", text: JSON.stringify(listHooks(), null, 2) }] })
  );

  mcp.registerTool(
    "get_command",
    { description: "Get a command by id. Optionally specify platform (cursor, claude, codex).", inputSchema: idParam },
    async (args) => {
      const result = getCommand(args.id, args.platform);
      if ("error" in result) {
        return { content: [{ type: "text", text: result.error }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
  mcp.registerTool(
    "get_agent",
    { description: "Get an agent by id. Optionally specify platform.", inputSchema: idParam },
    async (args) => {
      const result = getAgent(args.id, args.platform);
      if ("error" in result) {
        return { content: [{ type: "text", text: result.error }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
  mcp.registerTool(
    "get_skill",
    { description: "Get a skill by id (SKILL.md content). Optionally specify platform.", inputSchema: idParam },
    async (args) => {
      const result = getSkill(args.id, args.platform);
      if ("error" in result) {
        return { content: [{ type: "text", text: result.error }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
  mcp.registerTool(
    "get_rule",
    { description: "Get a rule by id. Optionally specify platform.", inputSchema: idParam },
    async (args) => {
      const result = getRule(args.id, args.platform);
      if ("error" in result) {
        return { content: [{ type: "text", text: result.error }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );
  mcp.registerTool(
    "get_hook",
    { description: "Get a hook script or config by id (e.g. format, config). Cursor only.", inputSchema: idParam },
    async (args) => {
      const result = getHook(args.id, args.platform);
      if ("error" in result) {
        return { content: [{ type: "text", text: result.error }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
  );

  return mcp;
}

export { SERVER_NAME, SERVER_VERSION };
