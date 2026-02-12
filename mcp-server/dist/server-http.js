import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { getActiveBackends } from "./platforms/index.js";
import { createConfigServer, SERVER_NAME } from "./server-setup.js";
const PORT = Number(process.env.PORT) || 3000;
const MCP_PATH = "/mcp";
/** One server + transport per session so multiple users can connect without "Already connected" errors. */
const sessions = {};
function getSessionId(req) {
    const raw = req.headers["mcp-session-id"];
    return typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
}
function readBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => {
            const raw = Buffer.concat(chunks).toString("utf8");
            if (!raw.trim()) {
                resolve(undefined);
                return;
            }
            try {
                resolve(JSON.parse(raw));
            }
            catch {
                resolve(undefined);
            }
        });
        req.on("error", reject);
    });
}
async function main() {
    const active = getActiveBackends();
    if (active.length === 0) {
        console.error(`[${SERVER_NAME}] No config found. Set CONFIG_PATH (or CURSOR_CONFIG_PATH / CLAUDE_CONFIG_PATH / CODEX_CONFIG_PATH / COPILOT_CONFIG_PATH) to a directory containing .cursor, .claude, Codex paths, or .github/agents.`);
    }
    else {
        console.log(`[${SERVER_NAME}] Active platforms: ${active.map((b) => b.platform).join(", ")}`);
    }
    const server = createServer(async (req, res) => {
        const path = req.url?.split("?")[0];
        if (path === "/health" || path === "/") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ status: "ok", mcp: MCP_PATH }));
            return;
        }
        if (path !== MCP_PATH && path !== `${MCP_PATH}/`) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Not Found", path: req.url }));
            return;
        }
        const sessionId = getSessionId(req);
        try {
            const parsedBody = req.method === "POST" ? await readBody(req) : undefined;
            const existing = sessionId ? sessions[sessionId] : undefined;
            if (existing) {
                await existing.transport.handleRequest(req, res, parsedBody);
                return;
            }
            const isInit = parsedBody &&
                (isInitializeRequest(parsedBody) ||
                    (Array.isArray(parsedBody) && parsedBody.some(isInitializeRequest)));
            if (req.method === "POST" && isInit) {
                const mcpForSession = createConfigServer();
                const transport = new StreamableHTTPServerTransport({
                    sessionIdGenerator: () => randomUUID(),
                    onsessioninitialized: (id) => {
                        sessions[id] = { transport, server: mcpForSession };
                    },
                });
                transport.onclose = () => {
                    if (transport.sessionId && sessions[transport.sessionId]?.transport === transport) {
                        delete sessions[transport.sessionId];
                    }
                };
                await mcpForSession.connect(transport);
                await transport.handleRequest(req, res, parsedBody);
                return;
            }
            if (req.method === "GET") {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    error: "Bad Request",
                    message: "GET requires Mcp-Session-Id. Send POST with initialize first.",
                }));
                return;
            }
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                error: "Bad Request",
                message: "Missing or invalid Mcp-Session-Id, or send initialize first.",
            }));
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            const stack = err instanceof Error ? err.stack : undefined;
            console.error(`[${SERVER_NAME}] MCP request error:`, message, stack ?? "");
            if (!res.headersSent) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Internal Server Error", message }));
            }
        }
    });
    server.listen(PORT, "0.0.0.0", () => {
        console.log(`[${SERVER_NAME}] Streamable HTTP at http://0.0.0.0:${PORT}${MCP_PATH}`);
    });
}
main().catch((err) => {
    console.error(`[${SERVER_NAME}] Fatal error:`, err);
    process.exit(1);
});
//# sourceMappingURL=server-http.js.map