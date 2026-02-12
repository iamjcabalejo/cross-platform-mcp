# Codex rules

Files in this directory (`.rules`) control **which commands Codex can run outside the sandbox** (e.g. `prefix_rule` in Starlark). They are not the same as coding-standard rules.

- **Coding standards** (type safety, naming, patterns): see `.cursor/rules/` or `.claude/rules/` (`.mdc` files).
- **Codex sandbox rules**: add `.rules` files here to allow/prompt/forbid specific shell commands. See [Codex Rules](https://developers.openai.com/codex/rules).

This repo’s shared standards are in Cursor and Claude rule files; use this folder only for Codex-specific command policy.
