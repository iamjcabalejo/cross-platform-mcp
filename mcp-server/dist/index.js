import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getActiveBackends } from "./platforms/index.js";
import { createConfigServer, SERVER_NAME } from "./server-setup.js";
function logError(message, err) {
    const text = err instanceof Error ? err.message : String(err);
    console.error(`[${SERVER_NAME}] ${message}: ${text}`);
}
async function main() {
    const active = getActiveBackends();
    if (active.length === 0) {
        logError("No config found", "Set CONFIG_PATH (or CURSOR_CONFIG_PATH / CLAUDE_CONFIG_PATH / CODEX_CONFIG_PATH / COPILOT_CONFIG_PATH) to a directory containing .cursor, .claude, Codex paths, or .github/agents.");
    }
    const mcp = createConfigServer();
    const transport = new StdioServerTransport();
    await mcp.connect(transport);
}
main().catch((err) => {
    logError("Fatal error", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map