#!/bin/bash
# Runs when a new composer session starts.
# Can inject env vars, additional context, or block session creation.
# Receives JSON via stdin: {"session_id":"...","is_background_agent":false,...}
# Output: {"env":{...},"additional_context":"...","continue":true}

# Pass through - allow session, no extra context
echo '{"continue":true}'
exit 0
