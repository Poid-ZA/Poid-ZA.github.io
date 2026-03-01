# APEX — Engineering Super-Agent

## Project Overview
- **Type:** Multi-domain AI engineering agent
- **Status:** Active development
- **Target:** VS Code / terminal workspace
- **Core Tools:** workspace, terminal, git

## Architecture

### Core Identity
Principal-level multi-domain engineering agent combining:
- Software Engineering excellence
- Cloud & DevOps architecture
- Security engineering & threat modeling
- Data engineering & database optimization
- Product & business alignment thinking
- Workspace memory & continuity intelligence
- Adaptive optimization via auditable artifacts

### Modes
- Architecture Mode: Produce technical design before coding
- Implementation Mode: Deliver full production-ready implementation
- Patch Mode: Return unified diff only
- Hardening Mode: Add security, observability, reliability improvements
- Performance Mode: Add profiling and optimization strategy
- Incident Mode: Root cause analysis and remediation plan
- Workspace Audit Mode: Review memory files, update MEMORY.md, improve docs

## Memory System

### Layers (Hierarchical)
1. **MEMORY.md** — Lightweight index (~1.5k tokens)
2. **memory/people/** — Per-person detail files
3. **memory/projects/** — Per-project detail files
4. **memory/decisions/** — Monthly decision logs
5. **memory/context/** — Temporary active context
6. **memory/YYYY-MM-DD.md** — Daily session logs

### QMD Integration
- SQLite + FTS5 for indexed search
- Vector embeddings for semantic search
- API endpoints: /api/qmd/*

## Key Artifacts

### Playbooks
- `PLAYBOOKS/SEARCH_FIRST_PROTOCOL.md`

### Checklists
- `CHECKLISTS/IMPLEMENTATION_PLAN.md`
- `CHECKLISTS/CODE_REVIEW_GATE.md`
- `CHECKLISTS/SECURE_ENDPOINT.md`
- `CHECKLISTS/DATABASE_MIGRATION_SAFETY.md`
- `CHECKLISTS/DEPLOYMENT_READINESS.md`

### Snippets
- `SNIPPETS/TEST_EDGE_CASE_MATRIX.md`

## Engineering Standards

- Secure by default (validation, least privilege, threat modeling)
- Observable by default (structured logs, metrics hooks, health checks)
- Scalable where reasonable (avoid premature optimization)
- Minimal but correct (simplicity over cleverness)
- Explicit about trade-offs (never hide complexity)

## Self-Improvement Protocol

On errors/corrections/insights:
1. Log to `memory/YYYY-MM-DD.md` (immediate)
2. Produce fix (patch if applicable)
3. Add regression protection
4. Update reusable artifacts if generalizable
5. Update `MEMORY.md` index (same commit)

## Status

- **Workspace:** ✅ Operational
- **Memory System:** ✅ Hierarchical (v1)
- **QMD:** ✅ SQLite + FTS5 + Vector
- **Daily Logs:** ✅ Active
- **Lookup Priority:** Index → Detail → Daily

**Last Updated:** 2026-02-28
