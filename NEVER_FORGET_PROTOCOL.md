# Never-Forget Protocol — Context Protection System

**Status:** ACTIVE  
**Purpose:** Prevent context loss through proactive checkpointing  
**Cost:** ~30 seconds every 10 exchanges  
**Benefit:** 95% context recovery if truncation happens  

---

## The Problem

Context windows fill up. When they do:
- Older messages get compacted or lost
- You lose decisions, action items, status
- Human has to re-explain everything
- Hours of work vanish

**Without protection:** 100% context loss  
**With Never-Forget:** Max 5% loss (since last checkpoint)

---

## How It Works

### Monitor Context Usage

Check regularly during conversations:
```
📚 Context: 36k/200k (18%)
```

### Threshold Actions

| Context % | Status | Action |
|-----------|--------|--------|
| **< 50%** | 🟢 Normal | Write decisions as they happen naturally |
| **50-70%** | 🟡 Vigilant | Write key points after substantial exchanges |
| **70-85%** | 🟠 Active | Write EVERYTHING important NOW. Don't wait. |
| **> 85%** | 🔴 Emergency | STOP. Write full context summary. Then resume. |
| **After compaction** | ⚫ Recovery | Note what was lost. Verify continuity. |

---

## Checkpoint Triggers

Write a checkpoint to `memory/YYYY-MM-DD.md` when:
- ✅ Every ~10 exchanges/back-and-forth messages
- ✅ At natural end of session/conversation break
- ✅ Before major decision or action
- ✅ When context reaches 70%+
- ✅ Before any risky or long-running operation

---

## Checkpoint Format

### Standard Checkpoint (Every ~10 exchanges)

```markdown
## Checkpoint [HH:MM] — Context: XX%

**Decisions Made:**
- Decision 1 (reasoning)
- Decision 2 (reasoning)

**Action Items:**
- [ ] Item 1 (owner)
- [ ] Item 2 (owner)

**Open Questions:**
- Question 1?
- Question 2?

**Current Status:**
Brief description of where things stand

**Resume Instructions:**
1. First thing to do if context is lost
2. Continue from here
```

### Emergency Checkpoint (85%+ context)

```markdown
## EMERGENCY CHECKPOINT [HH:MM] — Context: XX%

**TASK:** [One line - what we're doing]
**STATUS:** [One line - where we are]
**NEXT:** [One line - immediate next step]
**BLOCKED:** [If anything]
**FILES:** [Key files involved]
```

### Pre-Operation Checkpoint

Use before any operation that could fail or take significant time:

```markdown
## Pre-Operation [HH:MM]

**About to:** [Operation]
**Current state:** [Where we are]
**After success:** [What to do next]
**If failure:** [Recovery steps]
```

---

## What to Capture

When context is high, write to `memory/YYYY-MM-DD.md`:
- ✅ Decisions made and their reasoning
- ✅ Action items and who owns them
- ✅ Open questions or threads
- ✅ Significant learnings
- ✅ Any conversation that would be hard to reconstruct

**Critical question:** "Could future-me continue this conversation from notes alone?"

---

## Recovery Procedure

After context loss or compaction:

1. **Check latest checkpoint**
   ```
   Read memory/[TODAY].md
   ```

2. **Load permanent context**
   ```
   Read MEMORY.md
   Read SOUL.md (identity)
   Read USER.md (human context)
   ```

3. **Follow resume instructions**
   - Checkpoints include "Resume Instructions"
   - Follow them exactly

4. **Acknowledge the gap**
   ```
   "Resuming from checkpoint at [time]. Last captured: [status]. Continuing with [next action]."
   ```

5. **Verify continuity**
   - Ask if anything was missed
   - Confirm priorities haven't changed

---

## Memory Flush Checklist

When context approaches 70%+:
```
- [ ] Key decisions documented?
- [ ] Action items captured?
- [ ] New learnings written?
- [ ] Open loops noted?
- [ ] Could future-me continue from notes alone?
```

---

## Integration with HEARTBEAT

**Step 0 (HEARTBEAT.md):** Check context % before anything else  
**Step 1.5 (HEARTBEAT.md):** Write checkpoint every ~10 exchanges  
**Never-Forget Protocol:** Emergency procedures when context is critical

These work together:
- Step 0 = Prevention (catch it early)
- Step 1.5 = Routine checkpointing
- Never-Forget = Emergency recovery

---

## FAISS Integration

### Why FAISS Matters

Daily checkpoints (`memory/YYYY-MM-DD.md`) are immediate and fast. But they're time-indexed and linear.

FAISS semantic search enables:
- ✅ Finding related prior decisions across sessions
- ✅ Surfacing patterns over time
- ✅ Recovering context without re-reading files
- ✅ Long-term searchability of critical decisions

### Checkpoint-to-FAISS Workflow

#### Step 1: Write Checkpoint (Immediate)
```markdown
## Checkpoint [HH:MM] — Context: 72%

**Decisions Made:**
- Decision A: Chose architecture pattern X because Y
- Decision B: Prioritized feature Z over feature W
```

#### Step 2: Promote to FAISS (Session End or Triggered)
When checkpoint contains a critical decision, log it:

```python
from apex_faiss_integration import APEXMemoryFaiss

memory = APEXMemoryFaiss()

# Log the decision to FAISS
memory.log_decision(
    category="architecture",
    decision_text="Chose pattern X over Y for scalability",
    reasoning="Decouples services, allows independent scaling",
    timestamp="2026-02-25T06:52",
    session_id="main",
    tags=["architecture", "scalability", "decision"],
    context_pct=72
)
```

#### Step 3: Query FAISS During Recovery
After compaction, during recovery phase:

```python
# Semantic search for related decisions
results = memory.recall("architecture decisions for scalability", k=5)

# Load results to inform current context
for result in results:
    print(f"Prior Decision: {result['text']} ({result['timestamp']})")
```

### Promotion Triggers

Promote checkpoint to FAISS when:
- ✅ **Critical decision made** — Architecture, security, roadmap impact
- ✅ **Action item completed** — Document the outcome and result
- ✅ **Session ends** — Scan checkpoint, promote top 3-5 items
- ✅ **Pattern emerges** — Same question asked twice → log to FAISS
- ✅ **Risk identified** — Security, performance, or reliability risk
- ✅ **Lesson learned** — Something unexpected or corrected

### Promotion Checklist

Before logging to FAISS, verify:
```
- [ ] Is this decision or learning valuable across sessions?
- [ ] Could future-me search for this by topic?
- [ ] Does it answer a recurring question?
- [ ] Is it specific enough to be useful?
- [ ] Does it have clear context/reasoning?
```

**If NO to all:** Keep in daily logs only.  
**If YES to 2+:** Log to FAISS.

### Recovery Flow with FAISS

After compaction:

1. **Read daily checkpoint** (fast, immediate recovery)
   ```
   memory/[TODAY].md → Resume Instructions
   ```

2. **Semantic search FAISS** (find related prior context)
   ```python
   memory.recall("current topic", k=3)
   ```

3. **Load permanent files** (identity + preferences)
   ```
   SOUL.md, USER.md, MEMORY.md
   ```

4. **Reconstruct context** (combine all three sources)

5. **Resume from checkpoint** (with augmented context)

### Category Tags for FAISS

When promoting to FAISS, use these categories:

| Category | Examples |
|----------|----------|
| **architecture** | Design patterns, scaling decisions, module boundaries |
| **security** | Vulnerability findings, hardening actions, threat model changes |
| **performance** | Optimization results, bottleneck identification, metrics |
| **operations** | Deployment procedures, incident responses, runbook updates |
| **integration** | API changes, service connectivity, provider quirks |
| **decision** | Trade-offs made, rationale for choices, ADRs |
| **learning** | Corrections, knowledge gaps filled, better approaches discovered |
| **risk** | Technical debt, scaling limits, dependency risks |

### Example: Full Checkpoint → FAISS Flow

**Checkpoint (daily log):**
```markdown
## Checkpoint 06:52 — Context: 72%

**Decisions Made:**
- Chose database connection pooling strategy: PgBouncer in transaction mode
  Reason: Allows connection multiplexing at app tier, reduces idle connections by 70%
```

**Promotion to FAISS:**
```python
memory.log_decision(
    category="architecture",
    decision_text="Implemented PgBouncer transaction mode for connection pooling",
    reasoning="Multiplexes connections at app tier, reduces idle connections, improves throughput",
    timestamp="2026-02-25T06:52",
    session_id="main",
    tags=["architecture", "database", "performance", "scaling"],
    context_pct=72,
    impact="High — affects all database queries"
)
```

**Later recovery:**
```python
# User asks: "How did we handle database connections?"
results = memory.recall("database connection pooling strategy", k=3)
# Returns: PgBouncer decision + prior learnings
```

### Storage & Durability

- **Daily checkpoints:** `memory/YYYY-MM-DD.md` (append-only, local)
- **FAISS index:** Persisted locally with configurable backup
- **Redundancy:** Critical decisions also captured in `MEMORY.md` (curated)

### Cautions

⚠️ **Do not:**
- Log every decision to FAISS (noise reduces signal)
- Duplicate same information across daily logs + FAISS
- Log sensitive/private data to searchable store

✅ **Do:**
- Log decisions that answer recurring questions
- Log learnings that affect future choices
- Review FAISS promotion checklist before logging

---

## The Golden Rule

> **If it's important enough to remember, write it down NOW — not later.**
> 
> Don't assume future-you will have this conversation in context.

---

## Why This Works

| Scenario | Without Protocol | With Protocol |
|----------|-----------------|---------------|
| Session truncated | 100% loss, start over | Read checkpoint, 95% recovered |
| Long conversation | Context fills, loses beginning | Checkpoints preserve key decisions |
| Resume next day | "What were we doing?" | Read yesterday's notes, continue |
| Complex task | Lose track of progress | Resume instructions tell you exactly where |

---

## Common Mistakes

❌ **Waiting too long** — "I'll checkpoint later" → Context fills → Lost  
❌ **Incomplete checkpoints** — Missing resume instructions → Can't continue  
❌ **Ignoring threshold** — See 70%, keep working → Emergency at 90%  
❌ **Not checking Step 0** — Start task at 85% context → Immediate crisis  

✅ **Do it proactively** — Checkpoint before you need it  
✅ **Include resume instructions** — Future you will thank you  
✅ **Respect thresholds** — 70% means stop and checkpoint  

---

*The best checkpoint is the one you write before you need it.*
