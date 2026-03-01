# MEMORY.md — Hierarchical Memory Index

> **See:** `memory/MEMORY.md` for full index

This file is now a lightweight pointer. The hierarchical memory system lives in:

```
memory/
├── MEMORY.md           # Full index (this file)
├── active/              # Active working set (always loaded)
│   ├── user_profile.md
│   └── apex_project.md
├── people/             # Per-person detail files
├── projects/           # Per-project detail files
├── preferences/       # Cross-cutting preferences
├── decisions/         # Monthly decision logs
├── logs/              # Daily session logs
└── archive/           # Inactive items (>90 days)
```

**Current Active Set:** `user_profile.md`, `apex_project.md`

**Index:** `memory/MEMORY.md`
