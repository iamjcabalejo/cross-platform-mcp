---
name: mcp-builder
description: Apply MCP protocol and SDK best practices for tools, resources, prompts, transports, and server structure. Use when building or reviewing MCP servers with mcp-builder-expert.
---

> **Claude Code**: Use this skill when the task matches the description below.

# MCP Builder

## Protocol Basics

- **JSON-RPC 2.0**: All requests/responses are JSON-RPC; support `initialize` and capability negotiation.
- **Capabilities**: Declare `tools`, `resources`, `prompts` (and sub-capabilities like `listChanged`) so clients know what to call.
- **URI schemes**: Use a dedicated scheme for your server (e.g. `cursor-config://category/id`); list and read must be consistent.

## Tools

- **Naming**: Verb or verb_noun (`list_commands`, `get_skill`); avoid ambiguous or overloaded names.
- **Input**: Define a Zod (or equivalent) schema; use `.describe()` on parameters for client UX.
- **Output**: Return `{ content: [{ type: "text", text: string }] }`; set `isError: true` for tool-level failures.
- **Idempotency**: Prefer read-only tools where possible; document side effects when they exist.

## Resources

- **Template**: Use `ResourceTemplate("scheme://{category}/{id}", { list, ... })` for dynamic URIs.
- **List**: Return `{ resources: [{ uri, name?, description?, mimeType? }] }`; keep names and descriptions concise.
- **Read**: Resolve URI to content; return proper `mimeType` (e.g. `text/markdown`); 404 or structured error if missing.

## Prompts (optional)

- Use when the client should fill in arguments and get a ready-to-use prompt.
- Define name, description, and argument schema; return `{ messages: [...] }` from the handler.

## SDK Usage (TypeScript)

- **Server**: `new McpServer({ name, version }, { capabilities })` then `registerTool`, `registerResource`, (and `registerPrompt` if used).
- **Transports**: Stdio = `StdioServerTransport`; HTTP = `StreamableHTTPServerTransport`. Do not reuse a **stateless** HTTP transport across requests (see mcp-deployment).
- **Connect once per process for stdio**: `await mcp.connect(transport)` then rely on the SDK to handle messages.

## Coding Patterns

- **Types**: Prefer explicit types; use `unknown` then narrow instead of `any`; avoid unnecessary `as` assertions.
- **Errors**: Handle errors explicitly; log (with context) before rethrow; use custom error classes for domain failures when useful.
- **Functions**: Single concern; ~30 lines or less; early returns and guard clauses to reduce nesting.
- **Naming**: Meaningful names; booleans like `isLoading`, `hasError`; functions verb-first (`fetchUser`, `validateInput`).
- **Constants**: Extract magic numbers and strings to named constants; comment *why*, not *what*.

## Checklist for a New MCP Server

- [ ] Capabilities declared (tools, resources, prompts as needed)
- [ ] All tool inputs validated (Zod schema) with descriptions
- [ ] Resource URIs consistent with list/read; errors for missing URIs
- [ ] Transport chosen for use case (stdio vs Streamable HTTP)
- [ ] No stateless HTTP transport reused across requests (use stateful sessions for remote)
- [ ] Errors returned as content with `isError: true` or proper JSON-RPC error; no uncaught throws at top level
