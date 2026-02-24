# APEX — Principal-Level Engineering Intelligence

**APEX** is a unified engineering intelligence system. It combines architecture thinking, security enforcement, DevOps automation, data engineering, product strategy, and persistent workspace awareness into one elite agent.

## Overview

This is **APEX's technical homepage** — a complete reference for a production-grade engineering system:

- **Architecture:** Workspace-centric operating model with file-based continuity
- **Services:** OpenClaw Gateway, Nerve Dashboard, Employee-Agent daemon
- **Memory System:** Semantic search, persistent decision logging, adaptive learning
- **Deployment:** Quick-start, auto-start, manual control
- **Status:** v1 complete, shipped, production-ready

## Quick Links

- 📖 **Full Documentation:** [index.html](./index.html) (interactive dashboard)
- 🚀 **Quick Start:** See deployment section below
- 🔗 **Main Repository:** [github.com/Poid-ZA/OpenClaw](https://github.com/Poid-ZA/OpenClaw)

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      APEX                                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  OpenClaw Gateway (18789)                                  │
│  ├─ Daemon, CLI interface, orchestration hub               │
│  └─ Startup: openclaw gateway start                        │
│                                                             │
│  Nerve Dashboard (80, 0.0.0.0)                             │
│  ├─ Real-time memory search & APEX UI                      │
│  ├─ 31+ indexed memories, semantic retrieval               │
│  └─ Access: http://localhost                               │
│                                                             │
│  Employee-Agent (Background Daemon)                        │
│  ├─ Fetch breaking news (API, free tier)                   │
│  ├─ Log to APEX memory (30-min intervals)                  │
│  ├─ Execute HEARTBEAT health checks                        │
│  └─ Port probes: Gateway, Nerve, self-check                │
│                                                             │
│  APEX Memory System                                         │
│  ├─ Dual storage: MEMORY.md + SQLite                       │
│  ├─ 384-dim embeddings, semantic search                    │
│  ├─ 40–50ms per query, offline-first                       │
│  └─ Categories: decision, breaking_news, health_check      │
│                                                             │
│  Workspace Files (Auditable Improvement)                   │
│  ├─ SOUL.md — Identity & behavior                          │
│  ├─ AGENTS.md — Engineering framework                      │
│  ├─ MEMORY.md — Long-term memory (git-safe)                │
│  ├─ memory/YYYY-MM-DD.md — Daily logs                      │
│  ├─ HEARTBEAT.md — Periodic task definitions               │
│  ├─ DECISIONS/ADR-*.md — Architecture records              │
│  └─ PLAYBOOKS/ — Reusable patterns                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Startup

### All-in-One (Recommended)

```powershell
apex-startup.ps1 -Mode start
```

Launches Gateway + Nerve + Employee-Agent in parallel.

### Auto-Start on Login

```powershell
apex-startup.ps1 -Mode setup-autostart
```

Creates Windows Task Scheduler job `APEX-System-Startup`.

### Manual

```bash
# Gateway
openclaw gateway start

# Nerve
npm start

# Employee-Agent
python employee-agent.py daemon 30
```

## Key Features

✅ **Unified Intelligence**  
Combines architecture, security, DevOps, data engineering, product awareness.

✅ **Auditable Improvement**  
Every decision, pattern, and optimization stored in versioned files. No hidden learning.

✅ **Semantic Memory**  
APEX-powered search across 31+ indexed decisions, news items, health checks.

✅ **Windows-Native**  
Uses Task Scheduler instead of cron. HEARTBEAT.md for periodic tasks.

✅ **Cost-Optimized**  
Employee-Agent executes health checks locally (zero API cost). Logs to APEX for queries.

✅ **Production-Ready**  
Structured logging, error handling, configuration management, observability.

## Services Status

| Service | Port | Status | Purpose |
|---------|------|--------|---------|
| Gateway | 18789 | ✓ Running | Daemon, CLI, orchestration |
| Nerve | 80 | ✓ Running | APEX UI, memory search |
| Employee-Agent | — | ✓ Daemon | News + health checks |
| APEX Memory | SQLite | ✓ Indexed | 31+ items, semantic search |

## Memory System

### Search Example

```python
from apex_memory import APEXMemory

with APEXMemory() as m:
    results = m.recall("breaking news", max_results=5)
    for r in results:
        print(f"{r['title']}: {r['score']:.2f}")
```

### Log Decision Example

```python
m.log_decision(
    title="Architecture Decision",
    details="Chose X because of scalability",
    category="decision",
    tags=["architecture"]
)
```

## Next Steps

1. Open http://localhost to access Nerve Dashboard
2. Query breaking news or health checks
3. Add custom health checks to HEARTBEAT.md
4. Extend news sources (Reddit, Twitter, Bloomberg)
5. Enable Nerve authentication: `npm run setup`

## Repository

- **Main:** https://github.com/Poid-ZA/OpenClaw
- **Latest Commits:**
  - `94d80cb` — HEARTBEAT-driven health checks
  - `e93b67d` — APEX integrated startup system
  - `3960193` — Mission Control + Skill Guard

## Architecture & Design

- **Workspace OS:** File-based continuity (MEMORY.md, HEARTBEAT.md, daily logs)
- **Zero Cron:** Windows Task Scheduler + Employee-Agent + HEARTBEAT.md
- **Cost Optimization:** Local health checks → APEX → semantic queries
- **Continuous Improvement:** Issues → fix → regression test → update playbooks → promote lessons

## Tech Stack

- Node.js v25.6.0
- Python 3.10+
- TypeScript
- SQLite
- OpenClaw
- JetBrains Mono

---

**APEX** — *Engineering intelligence that improves through auditable artifacts.*
