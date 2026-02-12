# Deploying Config MCP to the Cloud

Run the server over **Streamable HTTP** so Cursor, Claude Code, Codex, or other MCP clients can add it by URL.

## 1. Run the HTTP server

From the **repo root** (so `.cursor`, `.claude`, or Codex paths are visible):

```bash
cd mcp-server
npm run build && npm run start:http
```

Server listens on `http://0.0.0.0:3000/mcp`. Set `PORT` if needed.

- **Health**: `GET /` or `GET /health` → `{ "status": "ok", "mcp": "/mcp" }`
- **MCP endpoint**: `POST /mcp` and `GET /mcp` (Streamable HTTP)

The server auto-detects **Cursor** (`.cursor/`), **Claude Code** (`.claude/`), and **Codex** (`.agents/skills`, `.codex/rules`, `AGENTS.md`, or `CODEX_HOME/skills`). Set `CONFIG_PATH` or platform-specific env vars so the process can see those directories.

## 2. How clients add your server

Once the server is reachable at a public URL (e.g. `https://your-app.up.railway.app`):

1. In **Cursor**: Settings → MCP → add server with URL.
2. In **Claude Code** / **Codex**: Configure MCP to use the same URL (Streamable HTTP).

```json
{
  "mcpServers": {
    "config-mcp": {
      "url": "https://your-app.up.railway.app/mcp"
    }
  }
}
```

**Important:** Use the URL that ends with `/mcp`, not the root. The root only returns a health check.

- Use **only** the `url` field for remote servers; omit `transport`. Cursor infers Streamable HTTP from the URL.
- Config file: **Global** `~/.cursor/mcp.json` (Windows: `%USERPROFILE%\.cursor\mcp.json`), or **Project** `.cursor/mcp.json`.
- After adding or changing the server, **restart** the client so the new tools are loaded.

## 3. Deploy to a host

### Option A: Railway (Docker)

Build with the **repository root** as context (so Docker can copy `.cursor`, `.claude`, `.cursor-plugin`, etc.). Do **not** set Root Directory to `mcp-server`.

1. [Railway](https://railway.app): New Project → Deploy from GitHub (this repo).
2. **Root Directory**: leave **empty**.
3. **Dockerfile path**: `mcp-server/Dockerfile`.
4. **Start Command**: leave default (`node dist/server-http.js`).
5. Set **PORT** if required.
6. Set **CONFIG_PATH** = `/app` (or **CURSOR_CONFIG_PATH** = `/app` if you only use Cursor config in the image).
7. Deploy; share `https://your-app.railway.app/mcp`.

### Option B: Render

1. [Render](https://render.com): New Web Service → connect repo.
2. **Root Directory**: leave **empty** (repo root so `.cursor` / `.claude` / etc. are available).
3. **Build Command**: `cd mcp-server && npm ci && npm run build`
4. **Start Command**: `cd mcp-server && npm run start:http`
5. **Environment**: Set **`CONFIG_PATH`** (or **CURSOR_CONFIG_PATH**) to the repo root so the server finds config; otherwise tools/resources will be empty.
6. Deploy; share `https://your-service.onrender.com/mcp`.

### Option C: Fly.io

1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/).
2. From **repo root**: build with `mcp-server/Dockerfile`, then deploy.
3. Set `PORT=3000` and `CONFIG_PATH=/app` (or `CURSOR_CONFIG_PATH=/app`).
4. Share `https://your-app.fly.dev/mcp`.

### Option D: Docker (any host)

From the **repo root**:

```bash
docker build -f mcp-server/Dockerfile -t config-mcp .
docker run -p 3000:3000 -e CONFIG_PATH=/app config-mcp
```

Expose port 3000 and use the host URL + `/mcp`.

## 4. Security notes

- The server is **read-only** (lists and reads files only).
- Use **HTTPS** in production (Railway/Render/Fly provide it).
- Optional: add auth (API key or OAuth) in front of the server if you want to restrict access.

## 5. Troubleshooting

- **No commands/agents/skills:**  
  1. Ensure the MCP URL ends with `/mcp`.  
  2. Set **CONFIG_PATH** (or **CURSOR_CONFIG_PATH** / **CLAUDE_CONFIG_PATH** / **CODEX_CONFIG_PATH**) to the directory that contains `.cursor`, `.claude`, or Codex paths; otherwise the server starts but returns empty lists.

- **Tools never appear:**  
  1. Use only `url` in config (no `transport`).  
  2. Restart the client after editing MCP config.  
  3. **Render cold start:** On free tier the service may sleep. Wake it with a request to the `/mcp` URL, then retry in the client.

## 6. Sharing the link

Share the **MCP endpoint URL** (`https://your-deployment.example.com/mcp`) and how to add it in Cursor / Claude Code / Codex. Clients can then list and read commands, skills, agents, rules, and hooks from your config.
