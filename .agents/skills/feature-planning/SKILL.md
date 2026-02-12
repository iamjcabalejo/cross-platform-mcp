---
name: feature-planning
description: Break features into implementation tasks for backend, frontend, and E2E subagents. Use when planning features, creating implementation plans, or running feature-plan command.
---

> **Codex**: Invoke with `$feature-planning` or when the task matches the description below.

# Feature Planning

## Task Blocks for Hand-off
- **Backend Tasks**: Setup → Database → API → Security
- **Frontend Tasks**: Components → Pages → Integration → Polish
- **Integration & Testing**: E2E flows, critical path coverage

## Per-Block Checklist
- [ ] Dependencies and env vars listed
- [ ] File changes (new/modified) specified
- [ ] API contract or schema described
- [ ] Success criteria clear

## Hand-off Order
1. backend-architect (API contract first)
2. frontend-architect (depends on API)
3. e2e-runner (validates full stack)

## Automatic Hand-off (Required)
- Always spawn subagents automatically—never suggest manual hand-off
- Use foreground mode so each subagent completes before the next starts
- Pass full context (plan sections, file changes, API contract) to each subagent

## Context to Pass
- Feature overview
- Technical design (components, endpoints, schema)
- File changes
- Dependencies
- API contract (for frontend)
- User flows (for E2E)
