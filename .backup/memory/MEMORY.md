# Hierarchical Memory Index

**Version:** 2026-02-28  
**Last Updated:** 2026-02-28 21:15 UTC  
**Token Estimate:** ~1800

---

## Metadata

| Property | Value |
|----------|-------|
| Version | 2.0 |
| Token Estimate | ~1800 |
| Max Allowed | 3000 |
| Format | Hierarchical Index |

---

## Active Working Set (always loaded — 2–4 files max)

These files are injected at every session start:

- `memory/active/user_profile.md` — Current user context
- `memory/active/apex_project.md` — Active project details

---

## People

| Name | File | Triggers / Keywords | Last Updated | Importance |
|------|------|---------------------|--------------|------------|
| The One | `people/The_One.md` | user, human, they, X, senior eng | 2026-02-28 | High |

---

## Projects

| Project Slug | File | Triggers / Keywords | Status | Last Updated |
|--------------|------|----------------------|--------|--------------|
| apex | `projects/apex.md` | apex, agent, super-agent, engineering | Active | 2026-02-28 |

---

## Preferences & Rules

| Category | File | Triggers | Last Updated |
|----------|------|----------|--------------|
| Comm Style | `preferences/communication-style.md` | tone, reply style, verbosity | 2026-02-28 |

---

## Decisions Archive

| Period | File | Key Topics | Last Updated |
|--------|------|------------|--------------|
| 2026-02 | `decisions/2026-02.md` | Hierarchical memory, QMD v1 | 2026-02-28 |

---

## Drill-Down Rules (mandatory)

1. Any mention of a name/project in triggers column → MUST read corresponding file
2. Questions containing who/what/when/why + entity → check People/Projects first
3. Uncertainty about past decision → search decisions/ + active set
4. Max 5 drill-down file reads at session initialization
5. If >5 needed → ask user which topics are currently most relevant

---

## Archive / Prune Policy

- Items inactive >90 days → move tomemory/archive/YYYY `/`
- Replace detail row with pointer + one-sentence summary
- Review monthly

---

## Operational Rules

### Session Start Load Order
1. Read `MEMORY.md` (~1.5–2k tokens)
2. Auto-load all files listed in Active Working Set
3. Scan user's first 1–3 messages for trigger keywords → queue up to 5 detail files
4. Read those detail files only if trigger confidence > medium

### Write / Update Protocol
- Whenever you create/edit a detail file → Immediately update corresponding row(s) in MEMORY.md
- Commit both changes together (same response)

### Active Set Management (rotate weekly)
- Max 4 files
- Criteria: highest recent access frequency + user explicitly says "keep focusing on X"

---

**System Status:** 🟢 Hierarchical Memory v2.0 Active
