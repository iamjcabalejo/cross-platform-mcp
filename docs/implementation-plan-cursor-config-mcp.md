# Implementation Plan: Cursor Config MCP Server

**Feature**: Expose commands, skills, agents, rules, and hooks via MCP so they are accessible from any MCP client (e.g. other Cursor workspaces, CLI tools, other IDEs).

**Scope**: One new MCP server package in this repo. No backend/frontend hand-off.

---

## 1. Feature Overview

### Problem
- Commands, skills, agents, rules, and hooks live under `.cursor/` in this repo and are only available when this project is the active Cursor workspace.
- There is no way for another workspace or tool to discover and read these assets via a standard protocol.

### Who It’s For
- You (and other devs) using this config from another project via MCP.
- Any MCP client that needs to “load” your Cursor commands/agents/skills/rules/hooks by reference.

### Key Functionality
- **Resources**: List and read by URI so clients can fetch:
  - Commands (e.g. `feature-plan`, `api-new`)
  - Skills (e.g. `feature-planning`, `postgresql`)
  - Agents (e.g. `backend-architect`, `e2e-runner`)
  - Rules (e.g. `core-standards`, `typescript`)
  - Hooks (scripts + `hooks.json`)
- **Tools** (optional but useful): List and get by category so the AI can discover and load the right asset without guessing URIs.

---

## 2. Technical Design

### 2.1 Architecture

```
┌─────────────────┐     MCP (stdio/SSE)     ┌──────────────────────────┐
│  MCP Client     │ ◄─────────────────────► │  Cursor Config MCP       │
│  (Cursor, CLI)  │   resources + tools     │  Server (Node/TypeScript) │
└─────────────────┘                         └────────────┬─────────────┘
                                                         │
                                                         │ read from
                                                         ▼
                                                ┌─────────────────────┐
                                                │  .cursor/            │
                                                │  commands/ agents/   │
                                                │  skills/ rules/      │
                                                │  hooks/ hooks.json   │
                                                └─────────────────────┘
```

- **Single process**: One MCP server that serves resources and tools.
- **Config root**: Server resolves paths from a **config root** (env `CURSOR_CONFIG_PATH` or current working directory), under which `.cursor/` is expected.

### 2.2 Resource URI Scheme

Use a single scheme so clients can list and read by URI:

| Category | URI pattern | Example |
|----------|-------------|---------|
| Commands | `cursor-config://command/{id}` | `cursor-config://command/misc/feature-plan` |
| Skills   | `cursor-config://skill/{id}`   | `cursor-config://skill/feature-planning` |
| Agents   | `cursor-config://agent/{id}`   | `cursor-config://agent/backend-architect` |
| Rules    | `cursor-config://rule/{id}`    | `cursor-config://rule/core-standards` |
| Hooks    | `cursor-config://hook/{id}`    | `cursor-config://hook/format` or `cursor-config://hook/config` |

- **id** for commands: path relative to `commands/` without `.md` (e.g. `misc/feature-plan`, `api/api-new`).
- **id** for skills: folder name under `skills/` (e.g. `feature-planning`).
- **id** for agents: filename without `.md` (e.g. `backend-architect`).
- **id** for rules: filename without `.mdc` (e.g. `core-standards`).
- **id** for hooks: script name without `.sh` or `config` for `hooks.json`.

### 2.3 Component Structure

- **Server entry** (`src/index.ts`): Create MCP server, register resources and tools, start stdio (or SSE) transport.
- **Config loader** (`src/config.ts`): Resolve `CURSOR_CONFIG_PATH`, validate `.cursor` layout, expose paths for commands/skills/agents/rules/hooks.
- **Resources** (`src/resources.ts`): Implement `resources/list` and `resources/read`; map URIs to files and return contents (and MIME type where useful).
- **Tools** (`src/tools.ts`): Implement tools:
  - `list_commands`, `list_agents`, `list_skills`, `list_rules`, `list_hooks`
  - `get_command`, `get_agent`, `get_skill`, `get_rule`, `get_hook` (by id)
- **Manifest** (`src/manifest.ts`): Optionally derive listing from existing `plugin.json` (commands, agents, skills, rules) so the server stays in sync with the plugin.

### 2.4 Data Flow

- **List**: Client calls `resources/list` → server scans `.cursor/commands`, `agents`, `skills`, `rules`, `hooks` (and reads `hooks.json`) → returns list of URIs (+ optional short descriptions).
- **Read**: Client calls `resources/read` with URI → server maps URI to file path → reads file → returns content (text/markdown for .md/.mdc, text/plain for .sh, application/json for hooks.json).
- **Tools**: Same data; tools return JSON (e.g. `{ "id", "name", "content" }` or list of `{ "uri", "name", "description" }`) so the model can choose what to load.

### 2.5 State Management

- No persistent state; the server is stateless and reads from disk on each request.
- Optional in-memory cache (TTL or no cache) for list results to avoid repeated filesystem scans; can be added later.

---

## 3. Implementation Plan

### 3.1 Setup (No hand-off)

- [ ] Create package under repo (e.g. `packages/cursor-config-mcp/` or `mcp-server/`).
- [ ] Initialize Node project: `package.json`, TypeScript, `tsconfig.json`.
- [ ] Add dependencies: `@modelcontextprotocol/sdk`, `zod`; dev: `tsx`, `@types/node`, `typescript`.
- [ ] Add script: `"start": "tsx src/index.ts"` and/or build `dist/` and `"start": "node dist/index.js"`.
- [ ] Define `CURSOR_CONFIG_PATH` in README and optionally in `.env.example`.

### 3.2 Config and Paths

- [ ] Implement `getConfigRoot()`: use `process.env.CURSOR_CONFIG_PATH` or `process.cwd()`.
- [ ] Resolve `.cursor` as `path.join(configRoot, '.cursor')`; validate it exists.
- [ ] Expose path helpers: `commandsDir`, `agentsDir`, `skillsDir`, `rulesDir`, `hooksDir`, `hooksJsonPath`.
- [ ] Handle missing `.cursor` or missing subdirs without crashing; return empty list / clear error for read.

### 3.3 Resources

- [ ] **resources/list**: For each category (commands, skills, agents, rules, hooks), scan dirs and build URIs; for commands use relative path under `commands/`; for skills use folder names and point to `SKILL.md`; for hooks include `config` for `hooks.json`. Return `Resource[]` with `uri` and optional `name`/`description`.
- [ ] **resources/read**: Parse URI (scheme `cursor-config://`, path `command|skill|agent|rule|hook/{id}`). Map to file path; read file; return `ReadResourceResult` with `contents` (array of one blob) and appropriate `mimeType` (e.g. text/markdown, text/plain, application/json).
- [ ] For skills, “resource” can be the skill folder: list entries for each skill (URI to `SKILL.md`); read can return `SKILL.md` content; optional later: include `references/*` in listing.

### 3.4 Tools

- [ ] **list_commands**: Return list of `{ uri, name, description }` (description from plugin.json or first line of .md).
- [ ] **list_agents**: Same shape.
- [ ] **list_skills**: Same shape.
- [ ] **list_rules**: Same shape.
- [ ] **list_hooks**: List script names + `config`; optional short description.
- [ ] **get_command**, **get_agent**, **get_skill**, **get_rule**, **get_hook**: Take `id` (string); return `{ id, name, content }` or error if not found. Content = file body (and for skills, main SKILL.md).

### 3.5 Server Wiring

- [ ] Create `Server` from MCP SDK; register resource handlers and tools.
- [ ] Use stdio transport by default so Cursor can run: `node dist/index.js` or `npx tsx src/index.ts`.
- [ ] Log errors to stderr; avoid logging full file contents.

### 3.6 Plugin and Discovery

- [ ] Document how to add this server to Cursor: in plugin’s `mcpServers` or in user MCP config.
- [ ] Example config: `"cursor-config": { "command": "node", "args": ["path/to/mcp-server/dist/index.js"], "env": { "CURSOR_CONFIG_PATH": "/path/to/MCP" } }`.
- [ ] Optional: add this server to `plugin.json` `mcpServers` so the same plugin that provides commands/agents also exposes them via MCP.

### 3.7 Testing and Polish

- [ ] Manual test: run server with stdio, call `resources/list` and `resources/read` for one URI per category; call each tool.
- [ ] Error cases: invalid URI, missing file, missing `CURSOR_CONFIG_PATH` when needed.
- [ ] README: purpose, env vars, how to run, how to add to Cursor, URI scheme, example tool calls.

---

## 4. File Changes

### New Files

```
mcp-server/
  package.json
  tsconfig.json
  src/
    index.ts        # MCP server entry, transport
    config.ts       # config root, path helpers
    resources.ts    # list + read by URI
    tools.ts        # list_* and get_* tools
    manifest.ts     # optional: read plugin.json for names/descriptions
  README.md
  .env.example      # CURSOR_CONFIG_PATH=
docs/
  implementation-plan-cursor-config-mcp.md   # this plan
```

### Modified Files

```
.cursor-plugin/plugin.json   # optional: add cursor-config to mcpServers
.cursor-plugin/MCP-SERVERS.md # add section for Cursor Config MCP server
```

---

## 5. Dependencies

### npm (MCP server package)

```bash
cd mcp-server && npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript tsx @types/node
```

### Environment variables

```bash
# Optional; defaults to process.cwd()
CURSOR_CONFIG_PATH=/absolute/path/to/MCP
```

---

## 6. Testing Strategy

- **Manual**: Run server, use MCP inspector or a small script to send `resources/list`, `resources/read`, and each tool; verify URIs and content.
- **No automated E2E required** for this plan; optional later: small integration test that starts server and asserts list/read for one resource per type.

---

## 7. Rollout Plan

- **Feature flag**: Not required; the server is additive.
- **Rollout**: Use in one Cursor workspace first; point `CURSOR_CONFIG_PATH` to this repo and add the server to MCP config; verify commands/agents/skills/rules/hooks are discoverable and readable.
- **Rollback**: Remove server from MCP config; no change to existing .cursor behavior.

---

## 8. Success Criteria

- [ ] MCP server runs and responds to `resources/list` and `resources/read` for all five categories.
- [ ] All existing commands, skills, agents, rules, and hooks are listable and readable by URI.
- [ ] Tools `list_*` and `get_*` return correct JSON and content.
- [ ] Server works when started from repo root or when `CURSOR_CONFIG_PATH` points to repo root.
- [ ] README and (optional) plugin docs explain how to configure and use the server.
- [ ] No hand-off to backend-architect or frontend-architect; plan is self-contained for a single MCP server package.

### Hand-off (Not Applied)

Per request: **no automatic hand-off** to backend-architect, frontend-architect, or e2e-runner. This feature is a single MCP server package and can be implemented without those subagents.

---

## 9. Next Steps

1. Review this plan and adjust URI scheme or tool set if needed.
2. Create `mcp-server/` and implement setup (3.1) and config (3.2).
3. Implement resources (3.3) then tools (3.4), then wire server (3.5).
4. Add plugin/docs updates (3.6) and test (3.7).
5. Use from another workspace via MCP and verify end-to-end.
