# Build works from repo root OR with Root Directory = mcp-server.
# Railway: either leave Root Directory empty (Dockerfile path: mcp-server/Dockerfile) or set Root Directory = mcp-server.
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
# If context was repo root, app is in mcp-server/ — move it to /app so paths are consistent.
RUN if [ -f mcp-server/package.json ]; then cp -r mcp-server/. . && rm -rf mcp-server; fi
RUN npm ci
RUN npm run build

# Run with .cursor / .cursor-plugin baked in when present (build from repo root).
# If .cursor or .cursor-plugin are missing in context, build still succeeds; server runs with empty config.
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV CONFIG_PATH=/app
COPY --from=builder /app/dist ./mcp-server/dist
COPY --from=builder /app/package.json ./mcp-server/
COPY --from=builder /app/node_modules ./mcp-server/node_modules
# Copy repo root into temp dir, then conditionally copy .cursor and .cursor-plugin (no COPY of missing dirs).
COPY . ./_ctx
RUN mkdir -p .cursor .cursor-plugin && \
    (test -d _ctx/.cursor && cp -r _ctx/.cursor/. .cursor/) || true && \
    (test -d _ctx/.cursor-plugin && cp -r _ctx/.cursor-plugin/. .cursor-plugin/) || true && \
    rm -rf _ctx
EXPOSE 3000
WORKDIR /app/mcp-server
CMD ["node", "dist/server-http.js"]
