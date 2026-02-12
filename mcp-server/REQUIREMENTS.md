# Cursor Config MCP Server — Requirements

Aligned with **requirements-discovery**: user story, acceptance criteria, PRD-style requirements.

---

## User Story

**As a** developer using Cursor from multiple workspaces,  
**I want** my commands, skills, agents, rules, and hooks exposed via MCP  
**so that** any MCP client (another Cursor workspace, CLI, or IDE) can discover and read them without opening this repo.

---

## Acceptance Criteria

| Given | When | Then |
|-------|------|------|
| MCP server is running with `CURSOR_CONFIG_PATH` set to this repo (or cwd) | Client calls `resources/list` | Server returns URIs for all commands, skills, agents, rules, and hooks |
| Client has a valid resource URI (e.g. `cursor-config://command/misc/feature-plan`) | Client calls `resources/read` with that URI | Server returns file content with correct MIME type |
| Client needs to discover assets by category | Client calls `list_commands` / `list_agents` / etc. | Server returns list of `{ uri, name, description }` |
| Client needs one asset by id | Client calls `get_command` / `get_agent` / etc. with `id` | Server returns `{ id, name, content }` or clear error if not found |
| `.cursor` is missing or a subdir is missing | Client calls list or read | Server returns empty list or clear error; does not crash |

---

## Requirements

### Must have (required for launch)

- MCP server runs over **stdio** and responds to `resources/list` and `resources/read`.
- **URI scheme** `cursor-config://{command|skill|agent|rule|hook}/{id}`; list and read implemented for all five categories.
- **Config root** from `CURSOR_CONFIG_PATH` or `process.cwd()`; `.cursor` expected underneath.
- **Commands**: list by scanning `.cursor/commands/` (recursive .md); id = path without .md. Read returns file content (text/markdown).
- **Skills**: list by scanning `.cursor/skills/` for dirs containing `SKILL.md`; id = folder name. Read returns SKILL.md content.
- **Agents**: list by scanning `.cursor/agents/*.md`; id = filename without .md. Read returns file content.
- **Rules**: list by scanning `.cursor/rules/*.mdc`; id = filename without .mdc. Read returns file content (text/markdown).
- **Hooks**: list scripts in `.cursor/hooks/*.sh` + `config` for hooks.json; read returns script body or JSON.
- **Tools**: `list_commands`, `list_agents`, `list_skills`, `list_rules`, `list_hooks` and `get_command`, `get_agent`, `get_skill`, `get_rule`, `get_hook` with correct input/output.
- **Errors**: Invalid URI or missing file returns structured error; no uncaught exceptions.
- **README**: Purpose, env vars, how to run, how to add to Cursor, URI scheme.

### Should have (important but not blocking)

- Descriptions for list endpoints from **plugin.json** (manifest) when available.
- **plugin.json** and **MCP-SERVERS.md** updated so this server can be enabled from the same plugin.

### Could have (future)

- In-memory cache for list results (TTL).
- Include skill `references/*` in skill resource listing.

---

## Out of Scope

- Editing or writing to `.cursor/` from the server.
- Authentication or authorization (server is read-only, local).
- Deploying as a remote HTTP MCP server (stdio-only for this implementation).

---

## Constraints

- **Technical**: Node 18+; TypeScript; `@modelcontextprotocol/sdk` + zod.
- **Compliance**: Read-only filesystem access; no PII in logs.
- **Timeline**: Single package; no backend/frontend subagent hand-off.
