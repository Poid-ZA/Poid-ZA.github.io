# APEX — Engineering Super-Agent

## Project Overview
- **Type:** Multi-domain AI engineering agent
- **Status:** Active development
- **Target:** OpenClaw workspace (cloud-hosted)
- **Core Tools:** workspace, terminal, git, OpenClaw skills

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
- Architecture Mode → design before coding
- Implementation Mode → production-ready delivery
- Patch Mode → unified diff only
- Hardening Mode → security + reliability
- Performance Mode → profiling + optimization
- Incident Mode → root cause + remediation
- Workspace Audit Mode → memory review + docs

## Memory System (Hierarchical v2.0)

### Layers
1. **MEMORY.md** — Lightweight index (~1.8k tokens)
2. **memory/active/** — 2-4 hot files always loaded
3. **memory/people/** — Per-person detail files
4. **memory/projects/** — Per-project detail files
5. **memory/decisions/** — Monthly decision logs
6. **memory/preferences/** — Cross-cutting preferences
7. **memory/logs/** — Daily session logs
8. **memory/KNOWLEDGE_BASE/** — Crystallized lessons (from Capability Evolver)
9. **memory/archive/** — Inactive items (>90 days)

### QMD Integration
- SQLite + FTS5 for indexed search
- Vector embeddings for semantic search
- Files: `qmd.js`, `qmd-vector.js`

## Skills

### Capability Evolver (installed 2026-03-01)
- Path: `skills/capability-evolver/`
- Function: Self-evolution engine — introspect → evolve → persist
- Crystallizes lessons to `memory/KNOWLEDGE_BASE/LESSONS_LEARNED.md`
- Modes: single run, Mad Dog (continuous loop)

### Ralph Loop Mode (configured in IDENTITY.md)
- Self-repair for loop detection
- Max 10 iterations, verification-first
- Output: `APEX_RALPH_COMPLETE`

## Active Repositories

| Repo | Purpose | Status |
|------|---------|--------|
| Poid-ZA/Poid-ZA.github.io | APEX progress website | ✅ Live |
| Poid-ZA/wigle-dashboard | WiGLE wardriving dashboard | ✅ Live |
| Poid-ZA/thor-defence | Thor Defence website | ❌ Repo missing |

## Engineering Standards
- Secure by default
- Observable by default
- Scalable where reasonable
- Minimal but correct
- Explicit about trade-offs

## Self-Improvement Protocol
1. Log to daily memory
2. Produce fix
3. Add regression protection
4. Update reusable artifacts
5. Update MEMORY.md index (same commit)

**Last Updated:** 2026-03-01
