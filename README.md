# Cross-Platform Config MCP

A **Model Context Protocol (MCP)** server and config bundle that exposes **commands**, **skills**, **agents**, **rules**, and **hooks** from **Cursor**, **Claude Code**, and **Codex** as MCP resources and tools. One server works across all three AI coding environments so any MCP client can discover and read this project’s configuration from any supported platform.

---

## What This Project Is For

- **Share one config across Cursor, Claude Code, and Codex** — Define commands, agents, skills, and rules once and use them in multiple AI coding tools.
- **Expose config via MCP** — The bundled MCP server lets any MCP client (Cursor, Claude, Codex, or others) list and read your commands, skills, agents, rules, and hooks by URI.
- **Use this repo as a Cursor plugin** — Install as a Cursor plugin to get 15 slash commands, 14 specialist agents, 15 skills, 5 rules, and hooks for modern web development (Next.js, React, TypeScript, API, Supabase, E2E).
- **Use config from another workspace** — Point the MCP server at this repo (or another repo using this layout) and use its config from a different project or IDE.

---

## General Description

This repository contains:

1. **Config for three platforms**  
   - **Cursor**: `.cursor/` (commands, agents, skills, rules, hooks) and `.cursor-plugin/plugin.json`.  
   - **Claude Code**: `.claude/` (commands, agents, skills, rules) and `.claude-plugin/plugin.json`.  
   - **Codex**: `.agents/skills/`, `.codex/rules/`, and root `AGENTS.md`.

2. **An MCP server** (`mcp-server/`)  
   - Discovers config from Cursor, Claude, and Codex directory layouts.  
   - Exposes **MCP resources** (URIs like `config://cursor/command/misc/feature-plan`) and **MCP tools** (e.g. `list_commands`, `get_skill`).  
   - Can run over stdio or **Streamable HTTP** for remote clients.

3. **A Cursor plugin** (`.cursor-plugin/`)  
   - Registers the Config MCP server and optional MCP servers (Context7, Playwright, Supabase) so Cursor can use this config and the MCP tools.

You can use this repo as a **template** for your own cross-platform AI config, or as a **ready-made plugin** for Cursor with a full set of commands, agents, and skills for web development.

---

## MCP Tools

The Config MCP server exposes these **tools** so clients can discover and read config:

| Tool | Description |
|------|-------------|
| **list_commands** | List all slash commands (Cursor, Claude). Each item includes `platform`, `uri`, `name`, `description`. |
| **list_agents** | List all agents (Cursor, Claude; Codex uses `AGENTS.md` as a single agent doc). |
| **list_skills** | List all skills across platforms. |
| **list_rules** | List all rules across platforms. |
| **list_hooks** | List hooks (Cursor only). |
| **get_command** | Get a command by id (e.g. `misc/feature-plan`). Optional `platform`: `cursor`, `claude`, `codex`. |
| **get_agent** | Get an agent by id. Optional `platform`. |
| **get_skill** | Get a skill by id (e.g. `api-design-patterns`). Optional `platform`. |
| **get_rule** | Get a rule by id. Optional `platform`. |
| **get_hook** | Get a hook by id (e.g. `format`, `audit`). Optional `platform` (Cursor only). |

Tools return items with a `platform` field so you can tell which environment (cursor, claude, codex) each entry came from.

---

## Commands (Slash Commands)

These are available in Cursor and Claude when this config is active (and discoverable via MCP as commands).

| Command | Description |
|---------|-------------|
| **new-task** | Analyze task complexity and create an implementation plan. |
| **feature-plan** | Plan new feature implementation. |
| **api-new** | Create new API endpoint. |
| **api-test** | Test API endpoints. |
| **api-protect** | Add API protection and validation. |
| **component-new** | Create new React component. |
| **page-new** | Create new Next.js page. |
| **docs-generate** | Generate documentation. |
| **lint** | Run linting and fix issues. |
| **code-optimize** | Optimize code for performance. |
| **code-cleanup** | Clean up and refactor code. |
| **code-explain** | Explain code. |
| **agents-md-generate** | Generate AGENTS.md documenting project coding patterns, structure, and standards. |
| **types-gen** | Generate Supabase TypeScript types. |
| **edge-function-new** | Create new Supabase Edge Function. |
| **commit-best** | Create a well-structured commit with proper message and push. |

---

## Skills

Skills are reusable workflows (e.g. API design, testing, refactoring). They live in `.cursor/skills/`, `.claude/skills/`, and `.agents/skills/` and are exposed by the MCP server as skills.

| Skill | Description |
|-------|-------------|
| **accessibility-checklist** | Verify WCAG 2.1 AA compliance for UI components. |
| **api-design-patterns** | Apply RESTful and API design best practices for endpoints, error handling, and validation. |
| **api-testing** | Structure and write API tests covering success, validation, auth, and error cases. |
| **code-review** | Review code for correctness, security, maintainability, and style. |
| **docs-structure** | Structure technical documentation for APIs, guides, and README. |
| **e2e-playwright** | Write reliable Playwright E2E tests with Page Object Model and stable selectors. |
| **feature-planning** | Break features into implementation tasks for backend, frontend, and E2E. |
| **mcp-builder** | Apply MCP protocol and SDK best practices for tools, resources, prompts, and server structure. |
| **mcp-deployment** | Deploy MCP over Streamable HTTP with session handling and client URL; hosting and troubleshooting. |
| **nosql-databases** | Apply NoSQL best practices for MongoDB, Convex, and document databases. |
| **performance-profiling** | Measure before optimizing; identify bottlenecks with data. |
| **postgresql** | Apply PostgreSQL best practices for schema design, indexing, vector search (pgvector), and RAG pipelines. |
| **refactoring-checklist** | Apply safe refactoring steps with behavior preservation. |
| **requirements-discovery** | Structure requirements discovery and produce PRDs, user stories, and acceptance criteria. |
| **security-audit** | Perform OWASP-aligned security checks on code and APIs. |

---

## Agents (Specialist Roles)

Agents are specialist roles you can adopt for specific tasks. Definitions live in `.cursor/agents/` and `.claude/agents/`; Codex uses `AGENTS.md` for project-level agent guidance.

| Agent | Description |
|-------|-------------|
| **tech-stack-researcher** | Research and recommend technology choices for feature development. |
| **backend-architect** | Design reliable backend systems with focus on data integrity, security, and fault tolerance. |
| **deep-research-agent** | Comprehensive research with adaptive strategies and intelligent exploration. |
| **frontend-architect** | Create accessible, performant UIs with focus on user experience and modern frameworks. |
| **learning-guide** | Teach programming concepts and explain code with progressive learning. |
| **performance-engineer** | Optimize system performance through measurement-driven analysis and bottleneck elimination. |
| **refactoring-expert** | Improve code quality and reduce technical debt through systematic refactoring. |
| **requirements-analyst** | Transform ambiguous ideas into concrete specifications (PRDs, user stories, acceptance criteria). |
| **security-engineer** | Identify security vulnerabilities and ensure compliance with security standards. |
| **system-architect** | Design scalable system architecture with focus on maintainability and long-term decisions. |
| **technical-writer** | Create clear technical documentation tailored to specific audiences. |
| **e2e-runner** | Design and execute end-to-end tests with focus on reliability, coverage, and maintainability. |
| **database-expert** | Optimize queries and ensure data access follows best practices (DBA-level expertise). |
| **mcp-builder-expert** | Design and implement custom MCP servers (protocol, transport, deployment). |

---

## Rules

Rules are coding standards and conventions applied in sessions. They are exposed by the MCP server and used by Cursor/Claude when this config is active.

| Rule | Description |
|------|-------------|
| **core-standards** | Core coding standards (type safety, error handling, naming, function design) applied to all sessions. |
| **typescript** | TypeScript conventions. |
| **react** | React component patterns. |
| **api-routes** | API route conventions. |
| **e2e-tests** | E2E test patterns. |

---

## Hooks (Cursor)

Hooks run at specific lifecycle points in Cursor. They are listed and readable via MCP; only Cursor uses them for execution.

| Hook | Description |
|------|-------------|
| **audit** | Runs before shell execution and on stop (e.g. audit script). |
| **format** | Runs after file edit (e.g. format script). |
| **session-init** | Runs on session start. |
| **config** | `hooks.json` configuration (trigger points and timeouts). |

---

## Platforms That Can Use This MCP

### 1. **Cursor**

- **As a plugin**: Install the Cursor plugin (`.cursor-plugin/`) to get the Config MCP server plus optional MCP servers (Context7, Playwright, Supabase). Commands, agents, skills, and rules from `.cursor/` are used by Cursor; MCP tools let Cursor (or other clients) list and read config.
- **As MCP client**: Add the Config MCP server to Cursor’s MCP settings (stdio or URL). Set `CONFIG_PATH` or `CURSOR_CONFIG_PATH` to the repo root so the server can read `.cursor/`.

### 2. **Claude Code (Claude for VS Code / Claude Code)**

- **As config**: Copy or symlink `.claude/` (and optionally `.claude-plugin/plugin.json`) into your project so Claude Code uses these commands, agents, skills, and rules.
- **As MCP client**: Point Claude Code’s MCP at this server (stdio or Streamable HTTP). Use `CONFIG_PATH` or `CLAUDE_CONFIG_PATH` so the server can read `.claude/`. Claude Code can then use the MCP tools to discover and read config.

### 3. **Codex**

- **As config**: Use `AGENTS.md` at repo root and/or `.agents/skills/` and `.codex/rules/`. Codex uses these for project and skill-level guidance.
- **As MCP client**: Configure Codex to use this MCP server (stdio or URL). Set `CONFIG_PATH` or `CODEX_CONFIG_PATH` to the repo root; optionally set `CODEX_HOME` for user-level skills. Codex can list and get commands, agents, skills, and rules via the MCP tools.

### 4. **Any other MCP-capable client**

- Any IDE or tool that supports MCP (e.g. another editor, CLI, or automation) can connect to the Config MCP server via stdio or Streamable HTTP and use the same tools and resources. Set the appropriate `*_CONFIG_PATH` or `CONFIG_PATH` so the server can see the desired platform’s directories.

---

## Project Layout (Quick Reference)

| Platform | Commands | Agents | Skills | Rules | Hooks |
|----------|----------|--------|--------|-------|-------|
| **Cursor** | `.cursor/commands/` | `.cursor/agents/` | `.cursor/skills/<name>/SKILL.md` | `.cursor/rules/*.mdc` | `.cursor/hooks/*.sh`, `hooks.json` |
| **Claude** | `.claude/commands/` | `.claude/agents/` | `.claude/skills/<name>/SKILL.md` | `.claude/rules/*.mdc` or `*.md` | — |
| **Codex** | — | `AGENTS.md` | `.agents/skills/<name>/SKILL.md`, `$CODEX_HOME/skills/` | `.codex/rules/*.rules` | — |

Detailed platform requirements and paths are in [docs/PLATFORM-REQUIREMENTS.md](docs/PLATFORM-REQUIREMENTS.md).

---

## Running the MCP Server

- **From repo root (recommended for Cursor plugin):**  
  The plugin typically runs: `node mcp-server/dist/index.js` with no env set (uses current working directory as config root).

- **From `mcp-server/`:**  
  `npm run build && npm start`  
  Optionally set `CONFIG_PATH` to the repo root.

- **Streamable HTTP (for remote clients):**  
  `npm run build && npm run start:http` in `mcp-server/`.  
  See `mcp-server/README.md` and `mcp-server/DEPLOYMENT.md` for deployment and URL configuration.

---

## Additional MCP Servers (Cursor Plugin)

When you use the Cursor plugin, it can also register these MCP servers (see `.cursor-plugin/MCP-SERVERS.md` for details):

- **Context7** (`@upstash/context7-mcp`) — Up-to-date, version-specific documentation for libraries.
- **Playwright** (`@playwright/mcp`) — Browser automation and web testing.
- **Supabase** (`@supabase/mcp-server-supabase`) — Supabase database operations and management.

---

## Documentation

- [docs/PLATFORM-REQUIREMENTS.md](docs/PLATFORM-REQUIREMENTS.md) — Config layout per platform (Cursor, Claude, Codex).
- [mcp-server/README.md](mcp-server/README.md) — MCP server usage, env vars, resources, and tools.
- [mcp-server/DEPLOYMENT.md](mcp-server/DEPLOYMENT.md) — Deploying the server (e.g. Streamable HTTP).
- [.cursor-plugin/MCP-SERVERS.md](.cursor-plugin/MCP-SERVERS.md) — MCP servers included in the Cursor plugin and how to add more.
- [AGENTS.md](AGENTS.md) — Codex project instructions and summary of agents/commands/skills.

---

## License

MIT.  
Author: Brader Payoy.
