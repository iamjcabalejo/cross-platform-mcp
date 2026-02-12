# AGENTS.md (Codex)

Project instructions for Codex. This file is used by the Config MCP server and by Codex for project/global guidance.

## Project expectations

- Apply core coding standards (type safety, error handling, naming). See `.cursor/rules/` or `.claude/rules/` for full rule text.
- Prefer explicit types, guard clauses, and pure functions where possible.
- Run lint and tests before committing.

## Specialist agents

When the task fits, adopt the following specialist roles. Full definitions live in `.cursor/agents/` and `.claude/agents/`; use this list to choose the right expertise.

| Role | When to use |
|------|-------------|
| **tech-stack-researcher** | Research and recommend technology choices for feature development |
| **backend-architect** | Backend system design, API development, database design, security, reliability |
| **deep-research-agent** | Comprehensive research with adaptive strategies and exploration |
| **frontend-architect** | Accessible, performant UIs; modern frameworks and UX |
| **learning-guide** | Teach programming concepts and explain code progressively |
| **performance-engineer** | Optimize performance; measurement-driven analysis and bottlenecks |
| **refactoring-expert** | Code quality, technical debt, systematic refactoring |
| **requirements-analyst** | Turn ideas into PRDs, user stories, acceptance criteria |
| **security-engineer** | Security vulnerabilities, compliance, best practices |
| **system-architect** | Scalable architecture, maintainability, long-term decisions |
| **technical-writer** | Clear technical documentation for specific audiences |
| **e2e-runner** | End-to-end tests: reliability, coverage, maintainability |
| **database-expert** | Queries, data access, DBA-level tuning |
| **mcp-builder-expert** | Custom MCP servers: protocol, transport, deployment |

## Skills

Skills in `.agents/skills/` extend Codex with reusable workflows (e.g. API design, testing, refactoring). Invoke with `$<skill-name>` or let Codex select when the task matches the skill description.

## Common workflows (slash-command style)

- **new-task** – Analyze task complexity and create an implementation plan
- **feature-plan** – Plan new feature implementation
- **api-new** / **api-test** / **api-protect** – API endpoints and validation
- **component-new** / **page-new** – React component or Next.js page
- **docs-generate** – Generate documentation
- **commit-best** – Well-structured commit and push

Full command definitions are in `.cursor/commands/` and `.claude/commands/`.
