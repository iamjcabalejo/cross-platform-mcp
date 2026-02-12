# Platform config layout (Config MCP)

The MCP server discovers config from **Cursor**, **Claude Code**, **Codex**, and **GitHub Copilot**. Each platform uses a specific directory layout. Ensure these exist when you want that platform to be active.

## Cursor

| Path | Required | Purpose |
|------|----------|---------|
| `.cursor/` | Yes | Root; must exist for Cursor backend to be active |
| `.cursor/commands/` | No | Slash commands (`.md`) |
| `.cursor/agents/` | No | Agent definitions (`.md`) |
| `.cursor/skills/` | No | Skills (each subdir has `SKILL.md`) |
| `.cursor/rules/` | No | Rules (`.mdc`) |
| `.cursor/hooks/` | No | Hook scripts (`.sh`) |
| `.cursor/hooks.json` | No | Hooks config |
| `.cursor-plugin/plugin.json` | No | Manifest (commands, agents, skills, rules with descriptions) |

## Claude Code

| Path | Required | Purpose |
|------|----------|---------|
| `.claude/` | Yes | Root; must exist for Claude backend to be active |
| `.claude/commands/` | No | Slash commands (`.md`) |
| `.claude/agents/` | No | Subagents (`.md`) |
| `.claude/skills/` | No | Skills (each subdir has `SKILL.md`) |
| `.claude/rules/` | No | Rules (`.mdc` or `.md`) |
| `.claude-plugin/plugin.json` | No | Manifest (same shape as Cursor) |

## Codex

| Path | Required | Purpose |
|------|----------|---------|
| `.agents/skills/` | No | Repo skills (each subdir has `SKILL.md`); backend active if any exist |
| `.codex/rules/` | No | Rule files (`.rules`); backend active if any exist |
| `AGENTS.md` | No | Project/global instructions; backend active if present |
| `$CODEX_HOME/skills/` | No | User-level skills (default `~/.codex/skills`) |

Codex backend is active if **at least one** of: repo skills, user skills, rules, or `AGENTS.md` exists.

## GitHub Copilot

| Path | Required | Purpose |
|------|----------|---------|
| `.github/agents/` | Yes | Root for custom agents; backend active if this directory exists |
| `.github/agents/*.agent.md` | No | Custom agent profiles (YAML frontmatter: name, description; body: markdown prompt) |

- **Filename rules**: Only characters `.`, `-`, `_`, `a-z`, `A-Z`, `0-9` (e.g. `backend-architect.agent.md`).
- **Frontmatter**: `name` (optional), `description` (required), optional `tools`, `model`, `mcp-servers`, `target`.
- Copilot has no native commands or skills; use Config MCP tools (`list_commands`, `get_command`, `list_skills`, `get_skill`) from Copilot Chat to run command-style workflows and apply skills. The **config-helper** agent in `.github/agents/` documents this.

Set `CONFIG_PATH` or `COPILOT_CONFIG_PATH` to the repo root so the server can read `.github/agents/`.

## Summary

- **Cursor**: Create `.cursor/` (and subdirs as needed) and optionally `.cursor-plugin/plugin.json`.
- **Claude**: Create `.claude/` (and subdirs as needed) and optionally `.claude-plugin/plugin.json`.
- **Codex**: Add `AGENTS.md`, or `.agents/skills/<name>/SKILL.md`, or `.codex/rules/*.rules`, or user skills in `~/.codex/skills`.
- **GitHub Copilot**: Create `.github/agents/` and add `*.agent.md` custom agent files.

Empty directories are fine; the server will return empty lists for that category.
