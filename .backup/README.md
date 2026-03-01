# APEX Workspace Backup

## Overview

This backup contains the APEX Engineering Super-Agent workspace configuration files.

## Backup Contents

```
.backup/
├── AGENTS.md           # Agent definition and capabilities
├── IDENTITY.md         # Agent identity configuration
├── SOUL.md             # Agent persona and behavior
├── USER.md             # User profile reference
├── TOOLS.md            # Tool-specific notes
├── HEARTBEAT.md        # Heartbeat configuration
├── MEMORY.md           # Memory index
├── qmd.js              # Query-Memory-Data system
├── qmd-vector.js       # Vector search extension
├── .gitignore          # Git ignore rules
└── memory/             # Hierarchical memory system
    ├── MEMORY.md
    ├── 2026-02-28.md
    ├── active/
    ├── decisions/
    ├── logs/
    ├── people/
    ├── preferences/
    └── projects/
```

---

## Restoration HOWTO

### Step 1: Restore Configuration Files

Copy the core configuration files back to the workspace root:

```bash
# From workspace root
cp .backup/AGENTS.md .
cp .backup/IDENTITY.md .
cp .backup/SOUL.md .
cp .backup/USER.md .
cp .backup/TOOLS.md .
cp .backup/HEARTBEAT.md .
cp .backup/MEMORY.md .
cp .backup/.gitignore .
```

### Step 2: Restore QMD System

```bash
cp .backup/qmd.js .
cp .backup/qmd-vector.js .
```

### Step 3: Restore Memory System

```bash
cp -r .backup/memory .
```

### Step 4: Configure Environment Variables (If Needed)

Create a `.env` file for sensitive configuration:

```bash
# Example .env template
cat > .env << 'EOF'
# Add environment variables here
# DO NOT commit .env to version control
EOF
```

Then add `.env` to `.gitignore` if not already present:

```bash
echo ".env" >> .gitignore
```

### Step 5: Verify Installation

```bash
# List restored files
ls -la

# Verify memory structure
ls -la memory/
```

---

## Security Notes

- **Never commit secrets** to version control
- Use `.env` files for API keys and tokens
- Keep `.env` in `.gitignore` at all times
- Rotate credentials periodically
- Review git configs for embedded credentials

---

## Quick Restore Script

Run all steps at once:

```bash
#!/bin/bash
set -e

echo "Restoring APEX Workspace..."

# Core configs
for f in AGENTS.md IDENTITY.md SOUL.md USER.md TOOLS.md HEARTBEAT.md MEMORY.md .gitignore; do
    [ -f ".backup/$f" ] && cp ".backup/$f" .
done

# QMD system
for f in qmd.js qmd-vector.js; do
    [ -f ".backup/$f" ] && cp ".backup/$f" .
done

# Memory system
[ -d ".backup/memory" ] && cp -r .backup/memory .

echo "✅ Restoration complete"
```

---

## Post-Restoration Checklist

- [ ] Verify all files restored
- [ ] Check memory structure integrity
- [ ] Test QMD initialization (optional)
- [ ] Review `.gitignore` includes `.env`
- [ ] Configure new credentials if needed

---

**Backup Date:** 2026-03-01  
**APEX Version:** v4
