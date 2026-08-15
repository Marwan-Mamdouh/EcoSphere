#!/usr/bin/env bash
# Launch the official MongoDB MCP server in read-only mode for OpenCode.
#
# The Atlas connection string lives in the gitignored .env (MONGO_URI).
# This wrapper exports it as MDB_MCP_CONNECTION_STRING so no secret ever
# appears in opencode.json or shell history.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$DIR/../.env"

if [[ -f "$ENV_FILE" ]]; then
  local_uri="$(grep -E '^MONGO_URI=' "$ENV_FILE" | head -n 1 | cut -d= -f2- | tr -d '"' | tr -d "'")"
  if [[ -n "$local_uri" ]]; then
    export MDB_MCP_CONNECTION_STRING="$local_uri"
  fi
fi

if [[ -z "${MDB_MCP_CONNECTION_STRING:-}" ]]; then
  echo "[mongodb-mcp] WARNING: MDB_MCP_CONNECTION_STRING is not set (no MONGO_URI in .env)." >&2
fi

exec npx -y mongodb-mcp-server@latest --readOnly
