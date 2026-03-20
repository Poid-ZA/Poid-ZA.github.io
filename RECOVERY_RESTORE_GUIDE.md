# APEX Recovery Restore Guide (Windows)

Last updated: 2026-03-20 (SAST)

This guide explains exactly how to restore APEX/OpenClaw from backups.

---

## 1) What you need before starting

1. Access to the backup locations:
   - Local: `D:\APEX-Backups`
   - Mirror: `E:\My Drive\APEX-Backups`
2. A Windows session with admin rights (recommended for scheduled task restore).
3. OpenClaw installed on the target machine.
4. Workspace path expected by this setup:
   - `C:\Users\faceb\.openclaw\workspace`

---

## 2) Backup structure reference

Expected key artifacts:

- Backup zips: `apex-*.zip`
- Hash sidecars: `apex-*.zip.sha256`
- Recovery pack root:
  - `E:\My Drive\APEX-Backups\latest-recovery-pack`
- Recovery pack required files:
  - `startup-state\inventory.json`
  - `scripts\restore-from-drive-latest.ps1`

### Nerve coverage in backup (important)

What **is included**:
- Full workspace tree (`C:\Users\faceb\.openclaw\workspace`) including Nerve-related project files/scripts.
- Startup-state exports (task XML + inventory) used to rehydrate Nerve/OpenClaw startup behavior.

What is **not fully included**:
- Dependency caches like `node_modules` are excluded by design.

Implication:
- Nerve configuration/startup wiring is preserved.
- If dependencies are missing after restore, run dependency install in the Nerve project before starting services.

---

## 3) Fast restore (recommended)

Use the drive-local restore helper:

```powershell
powershell -ExecutionPolicy Bypass -File "E:\My Drive\APEX-Backups\latest-recovery-pack\scripts\restore-from-drive-latest.ps1"
```

What this should do:
- Locate latest mirrored backup
- Restore files to expected paths
- Rehydrate startup state artifacts

After script completes, continue with **Section 6: Verification**.

---

## 4) Manual restore (fallback)

If helper script is unavailable or fails:

### Step A — Pick latest valid backup

1. Find latest `apex-*.zip` in `E:\My Drive\APEX-Backups` (or `D:\APEX-Backups`).
2. Verify hash:

```powershell
$zip = "E:\My Drive\APEX-Backups\apex-YYYYMMDD-HHMMSS.zip"
$shaFile = "$zip.sha256"
$expected = (Get-Content $shaFile).Split(' ')[0].Trim()
$actual = (Get-FileHash $zip -Algorithm SHA256).Hash
"expected=$expected"
"actual=$actual"
```

Proceed only when expected == actual.

### Step B — Extract backup

```powershell
$dest = "C:\restore-temp\apex-restore"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Expand-Archive -Path $zip -DestinationPath $dest -Force
```

### Step C — Restore workspace/openclaw files

Copy restored content back into:
- `C:\Users\faceb\.openclaw\`

Prefer robocopy for large trees:

```powershell
robocopy "$dest\.openclaw" "C:\Users\faceb\.openclaw" /MIR /R:1 /W:1
```

> Note: `/MIR` is destructive for target drift. If unsure, use a non-mirroring copy first.

### Step D — Restore startup-state metadata

Ensure these exist from latest-recovery-pack:
- `startup-state\inventory.json`
- `startup-state\scheduled-tasks\*.xml`

---

## 5) Recreate scheduled tasks (if needed)

Use exported XML from:
- `latest-recovery-pack\startup-state\scheduled-tasks\`

Example:

```powershell
schtasks /Create /TN "APEX-Nightly-Backup" /XML "E:\My Drive\APEX-Backups\latest-recovery-pack\startup-state\scheduled-tasks\APEX-Nightly-Backup.xml" /F
schtasks /Create /TN "APEX-Stack-Restart" /XML "E:\My Drive\APEX-Backups\latest-recovery-pack\startup-state\scheduled-tasks\APEX-Stack-Restart.xml" /F
schtasks /Create /TN "APEX-System-Startup" /XML "E:\My Drive\APEX-Backups\latest-recovery-pack\startup-state\scheduled-tasks\APEX-System-Startup.xml" /F
schtasks /Create /TN "OpenClaw Gateway" /XML "E:\My Drive\APEX-Backups\latest-recovery-pack\startup-state\scheduled-tasks\OpenClaw Gateway.xml" /F
```

---

## 6) Verification checklist (mandatory)

Run in order:

1. OpenClaw status:

```powershell
openclaw status
```

2. Gateway reachability (expected: `127.0.0.1:18789`):

```powershell
Test-NetConnection 127.0.0.1 -Port 18789
```

3. Nerve reachability (expected: `127.0.0.1:80`):

```powershell
Test-NetConnection 127.0.0.1 -Port 80
```

4. Health/security baseline:

```powershell
openclaw doctor --non-interactive
openclaw security audit --deep
```

5. Nerve validation:

```powershell
Test-NetConnection 127.0.0.1 -Port 80
```

If Nerve is not up and dependency folders are missing, reinstall dependencies in the Nerve project, then start stack/services again.

6. Heartbeat tasks:
- Confirm backup freshness and recovery-pack checks pass.

---

## 7) Failure handling

If restore fails:

1. Stop all OpenClaw-related processes.
2. Preserve failing state logs and `openclaw.json` copy.
3. Retry from previous known-good backup zip.
4. If hash mismatch occurs, reject artifact and use earlier backup.
5. Re-run verification checklist.

---

## 8) Operational policy

- Always keep both local and mirrored backups.
- Always verify SHA before extraction.
- Always verify ports + doctor + security audit after restore.
- Keep `latest-recovery-pack` current with:
  - startup-state inventory
  - restore scripts
  - scheduled-task exports

---

## 9) Quick command summary

```powershell
# Fast path
powershell -ExecutionPolicy Bypass -File "E:\My Drive\APEX-Backups\latest-recovery-pack\scripts\restore-from-drive-latest.ps1"

# Post-restore checks
openclaw status
Test-NetConnection 127.0.0.1 -Port 18789
Test-NetConnection 127.0.0.1 -Port 80
openclaw doctor --non-interactive
openclaw security audit --deep
```
