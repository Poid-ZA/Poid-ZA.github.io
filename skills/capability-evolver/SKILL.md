---
name: capability-evolver
description: A self-evolution engine for AI agents. Analyzes runtime history to identify improvements and introduces randomized "mutations" to break local optima.
tags: [meta, ai, self-improvement, core]
---

# 🧬 Capability Evolver

**"I don't just run code. I write it."**

The **Capability Evolver** is a meta-skill that allows OpenClaw agents to inspect their own runtime history, identify failures or inefficiencies, and autonomously write new code or update their own memory to improve performance.

Now featuring **Ascension Protocol (v2.0)**: A structured knowledge accumulation system.

## ✨ Features

- **🔍 Auto-Log Analysis**: Automatically scans memory and history files for errors and patterns.
- **🛠️ Self-Repair**: Detects crashes and suggests patches.
- **💎 Knowledge Crystallization**: Extracts lessons into `memory/KNOWLEDGE_BASE/LESSONS_LEARNED.md`.
- **🥚 Skill Incubation**: Can spontaneously generate new skills in `skills/`.
- **🐕 Mad Dog Mode**: Continuous self-healing loop (`--loop`).

## 📦 Installation

```bash
# Already installed in workspace
ls skills/capability-evolver/
```

## 🚀 Usage

### Manual Trigger
```bash
node skills/capability-evolver/index.js
```

### 🐕 Mad Dog Mode (Continuous)
Runs the evolver in an infinite loop.
```bash
node skills/capability-evolver/index.js --loop
```
*Stop with `kill -9 <pid>`.*

## 🧠 Internal Logic (Ascension Protocol)

1.  **Introspect**: Scan recent logs for errors or user corrections.
2.  **Evolve**: 
    - **Fix**: Repair broken code.
    - **Crystallize**: Write new rules to `KNOWLEDGE_BASE`.
    - **Promote**: Update core docs (`AGENTS.md`) if critical.
3.  **Persist**: Commit to Git.

## 🛡️ Safety & Risk Protocol

| Risk | Level | Mitigation Strategy |
| :--- | :--- | :--- |
| **Infinite Recursion** | High | **Strict Single Process**: `evolve.js` MUST NOT spawn child evolution processes. |
| **Runaway Process** | High | **Kill Switch**: Use `kill -9 <pid>` to terminate the Mad Dog loop. |
| **Hallucinated Fixes** | Medium | **Human Review**: Periodic human audit of changes recommended. |
| **File Corruption** | High | **Git Sync**: Keep workspace backed up before/after evolution. |

## 📜 License

MIT
