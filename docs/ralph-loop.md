# Ralph Loop Mode

Ralph Loop Mode is a self-repair mechanism for APEX that detects when the agent is stuck in a repetitive thought or action pattern and breaks out of it.

## What It Is

A diagnostic mode that:
- Detects repeated thought patterns or tool use
- Breaks infinite loops before token exhaustion
- Provides structured escape routes
- Logs iterations for later analysis

## When to Use

- Same tool called 3+ times with similar args
- Circular reasoning detected
- Repeated file edits without progress
- Same error encountered multiple times

## How to Run

```bash
# Enable Ralph Loop Mode
export RALPH_MODE=enabled
export RALPH_MAX_ITERATIONS=10

# Or per-session
RALPH_MODE=enabled scripts/verify.sh
```

## Controls

| Variable | Default | Description |
|----------|---------|-------------|
| RALPH_MAX_ITERATIONS | 10 | Hard stop after N iterations |
| RALPH_VERIFY_EACH | true | Run verify.sh each iteration |
| RALPH_ESCAPE_PROMPT | "" | Custom prompt when stuck |

## Stop Conditions

Loop stops when ANY of:
1. `verify.sh` exits 0 (success)
2. Iteration count >= RALPH_MAX_ITERATIONS
3. User interrupts with Ctrl+C
4. SOUL.md override detected

## Completion Promise

When Ralph Loop completes (success or failure), APEX must:
1. Log final state to `memory/ralph-loop-log.md`
2. Return EXACTLY: `APEX_RALPH_COMPLETE`
3. If failed: summarize what was tried and ask human

## Demo

Run the demo:
```bash
cd /root/.openclaw/workspace
RALPH_MODE=enabled ./scripts/verify.sh
```

Expected: fail → fix → pass
