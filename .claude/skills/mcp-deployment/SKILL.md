---
name: mcp-deployment
description: Deploy MCP servers over Streamable HTTP with correct session handling and client URL. Use when deploying to Render/Railway/Fly or troubleshooting remote MCP with mcp-builder-expert.
---

> **Claude Code**: Use this skill when the task matches the description below.

# MCP Deployment

## Streamable HTTP vs Stdio

| Use case           | Transport              | Session model   |
|--------------------|------------------------|-----------------|
| Local / same machine | Stdio                  | N/A (single client) |
| Remote (URL in Cursor, etc.) | Streamable HTTP        | Stateful per client |

## Critical: Stateful Sessions for HTTP

- **Stateless** (`sessionIdGenerator: undefined`): The SDK allows **only one request per transport instance**. The second request (e.g. after `initialize`) throws and returns 500. Do **not** use a single stateless transport for all requests.
- **Stateful**: Use `sessionIdGenerator: () => randomUUID()` (or similar). On first request (e.g. `initialize`), create a new transport, connect the server to it, handle the request; store the transport in a map keyed by **session ID** (from response header or `onsessioninitialized`). On later requests, require `Mcp-Session-Id` header, look up the transport, reconnect the server to it, then handle the request. Clean up the map in `onclose`.

## Server Wiring for HTTP

1. **Session map**: `Record<string, StreamableHTTPServerTransport>`.
2. **POST with existing session**: If `Mcp-Session-Id` present and in map → `mcp.connect(transport)` then `transport.handleRequest(req, res, parsedBody)`.
3. **POST without session, body is `initialize`**: Create new transport with `sessionIdGenerator`, `onsessioninitialized` (store in map), `onclose` (delete from map). Connect server, then handle request.
4. **GET**: Require `Mcp-Session-Id`; look up transport; connect server to it; handle request (SSE).
5. **DELETE**: Same as GET; transport handles session teardown; map cleaned in `onclose`.

## Client URL

- Clients (e.g. Cursor) must use the **MCP endpoint path**, not the root. Example: `https://your-app.onrender.com/mcp`. Root often returns only a health payload; tools/resources are on `/mcp`.

## Environment (e.g. Render)

- **CURSOR_CONFIG_PATH**: Set to the **repo root** (the directory that contains `.cursor` and `mcp-server` or equivalent). If the start command is `cd mcp-server && npm run start:http`, the process cwd is the `mcp-server` directory; without this variable the server may look for `.cursor` inside `mcp-server` and return empty lists.

## Hosting Checklist

- [ ] Build from repo root if Dockerfile copies `.cursor` / config.
- [ ] Start command runs the HTTP entry (e.g. `node dist/server-http.js` or `npm run start:http` from the right directory).
- [ ] `CURSOR_CONFIG_PATH` set to repo root when config lives outside the started process cwd.
- [ ] Health at `GET /` or `GET /health`; MCP at `POST/GET/DELETE /mcp` (or chosen path).
- [ ] Docs state the **exact URL** clients must add (e.g. `https://host/mcp`).

## Troubleshooting

- **No tools/resources in client**: (1) Client URL must include `/mcp`. (2) On Render/similar, set `CURSOR_CONFIG_PATH` to repo root so list/read find `.cursor` and plugin config.
- **500 after first request**: Stateless transport reused; switch to stateful sessions and a session map as above.
- **400 on follow-up requests**: Client may not be sending `Mcp-Session-Id`; ensure client uses the session ID from the first response and sends it on subsequent requests.
