# Config MCP Server (Cursor, Claude Code, Codex, GitHub Copilot)

MCP server that exposes **commands**, **skills**, **agents**, **rules**, and **hooks** from **Cursor**, **Claude Code**, **Codex**, and **GitHub Copilot** as MCP resources and tools. One server works across all four environments so any MCP client can discover and read config from any supported platform.

## Requirements

- Node.js 18+
- At least one of:
  - **Cursor**: A directory containing `.cursor/` (commands, agents, skills, rules, hooks) and optionally `.cursor-plugin/plugin.json`.
  - **Claude Code**: A directory containing `.claude/` (commands, agents, skills, rules) and optionally `.claude-plugin/plugin.json`.
  - **Codex**: A directory containing `.agents/skills`, `.codex/rules`, or `AGENTS.md`; or user skills in `~/.codex/skills` (or `CODEX_HOME`).
  - **GitHub Copilot**: A directory containing `.github/agents/` (custom agent `*.agent.md` files).

## Environment

| Variable | Description |
|----------|-------------|
| `CONFIG_PATH` | Optional. Root directory for all platforms. Defaults to `process.cwd()`. |
| `CURSOR_CONFIG_PATH` | Optional. Root that contains `.cursor/`. Overrides CONFIG_PATH for Cursor. |
| `CLAUDE_CONFIG_PATH` | Optional. Root that contains `.claude/`. Overrides CONFIG_PATH for Claude. |
| `CODEX_CONFIG_PATH` | Optional. Root that contains `.agents/skills`, `.codex/rules`, or `AGENTS.md`. Overrides CONFIG_PATH for Codex. |
| `COPILOT_CONFIG_PATH` | Optional. Root that contains `.github/agents/`. Overrides CONFIG_PATH for GitHub Copilot. |
| `CODEX_HOME` | Optional. Codex user directory (e.g. `~/.codex`) for user-level skills. Defaults to `$HOME/.codex`. |

## Run

From this package (with dependencies installed):

```bash
npm run build && npm start
```

Or from the repo root, pointing at that root:

```bash
cd mcp-server && CONFIG_PATH=/path/to/your/repo npm start
```

For Streamable HTTP (e.g. for Cursor/Claude/Codex to connect by URL):

```bash
npm run build && npm run start:http
```

## Platform layout reference

| Platform | Commands | Agents | Skills | Rules | Hooks |
|----------|----------|--------|--------|-------|-------|
| **Cursor** | `.cursor/commands/*.md` | `.cursor/agents/*.md` | `.cursor/skills/<name>/SKILL.md` | `.cursor/rules/*.mdc` | `.cursor/hooks/*.sh`, `hooks.json` |
| **Claude** | `.claude/commands/*.md` | `.claude/agents/*.md` | `.claude/skills/<name>/SKILL.md` | `.claude/rules/*.mdc` or `*.md` | — |
| **Codex** | — | `AGENTS.md` (single doc) | `.agents/skills/<name>/SKILL.md`, `$CODEX_HOME/skills/<name>/SKILL.md` | `.codex/rules/*.rules` | — |
| **GitHub Copilot** | via MCP | `.github/agents/*.agent.md` | via MCP | via MCP | — |

## MCP Resources

**URI scheme**: `config://{platform}/{category}/{id}`

| Platform | Category | Example URI |
|----------|----------|-------------|
| cursor | command, skill, agent, rule, hook | `config://cursor/command/misc/feature-plan` |
| claude | command, skill, agent, rule | `config://claude/skill/api-design-patterns` |
| codex | skill, rule, agent | `config://codex/skill/skill-creator`, `config://codex/agent/AGENTS.md` |
| copilot | agent | `config://copilot/agent/backend-architect` |

- **resources/list**: Returns all resources from every active platform.
- **resources/read**: Returns file content for a given URI. Legacy `cursor-config://{category}/{id}` is supported and normalized to `config://cursor/...`.

## MCP Tools

| Tool | Description |
|------|-------------|
| `list_commands` | List all commands (Cursor, Claude). Each item includes `platform`, `uri`, `name`, `description`. |
| `list_agents` | List all agents (Cursor, Claude, Codex, GitHub Copilot). |
| `list_skills` | List all skills across platforms. Copilot can use get_skill via MCP. |
| `list_rules` | List all rules across platforms. |
| `list_hooks` | List hooks (Cursor only). |
| `get_command` | Get a command by id. Optional `platform`: `cursor`, `claude`, `codex`, `copilot`. |
| `get_agent` | Get an agent by id. Optional `platform`: `cursor`, `claude`, `codex`, `copilot`. |
| `get_skill` | Get a skill by id. Optional `platform`. |
| `get_rule` | Get a rule by id. Optional `platform`. |
| `get_hook` | Get a hook by id. Cursor only; use `platform: cursor`. |

## Add to Cursor

In Cursor MCP settings (or your plugin’s `mcpServers`), add:

```json
{
  "config-mcp": {
    "command": "node",
    "args": ["/absolute/path/to/MCP/mcp-server/dist/index.js"],
    "env": {
      "CONFIG_PATH": "/absolute/path/to/your/repo"
    }
  }
}
```

Or use a remote URL (Streamable HTTP):

```json
{
  "config-mcp": {
    "url": "https://your-app.example.com/mcp"
  }
}
```

## Add to Claude Code / Codex

Configure MCP in your client to point at this server (stdio or URL). Use the same env vars so the server can see `.cursor`, `.claude`, or Codex paths. Resources and tools are environment-agnostic; each item includes a `platform` field so you can tell which environment it came from.

## License

MIT
