# 🎛️ APEX Service Controller — Web Dashboard

**Production-ready control panel for APEX services (Gateway, Nerve, Employee-Agent)**

---

## 📋 What It Does

- **Start all services:** `▶ Start` button (Gateway + Nerve)
- **Stop all services:** `⏹ Stop` button
- **Restart (stop + start):** `↻ Restart` button
- **Real-time status:** Auto-refreshes every 5 seconds
- **Port health checks:** TCP probes on 18789 (Gateway) and 80 (Nerve)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- Windows PowerShell 5.1+
- Workspace: `C:\Users\faceb\.openclaw\workspace\`

### Launch

```powershell
.\launch-controller.ps1
```

**What happens:**
1. Starts Node.js server on port 3001
2. Opens browser to http://localhost:3001
3. Dashboard displays service status and controls

### Manual Alternative

```bash
node apex-controller.js
# Then open: http://localhost:3001
```

---

## 🎯 Features

### Service Status Display

```
┌─────────────────────┐
│ GATEWAY    RUNNING  │
│ Port: 18789         │
├─────────────────────┤
│ NERVE      STOPPED  │
│ Port: 80            │
└─────────────────────┘
```

### Controls

| Button | Action | Equivalent |
|--------|--------|-----------|
| **▶ Start** | Launch all services | `.\apex-startup.ps1 -Mode start` |
| **↻ Restart** | Stop + Start (clean reload) | Stop then Start |
| **⏹ Stop** | Graceful shutdown | `.\apex-startup.ps1 -Mode stop` |
| **🔄 Refresh** | Manual status update | Polls all ports |

---

## 🔧 Technical Details

### Files

| File | Purpose |
|------|---------|
| `apex-controller.js` | Node.js HTTP server (4.2 KB) |
| `public/index.html` | Web UI dashboard (8.2 KB) |
| `launch-controller.ps1` | PowerShell launcher (1.3 KB) |

### API Endpoints

```
GET  /api/status        → Returns current service status
POST /api/start         → Execute start command
POST /api/stop          → Execute stop command
POST /api/restart       → Execute restart (stop + start)
```

### Health Checks

**Gateway (Port 18789):**
```javascript
TCP socket probe: 127.0.0.1:18789
Timeout: 1000ms
Status: "running" | "stopped"
```

**Nerve (Port 80):**
```javascript
TCP socket probe: 127.0.0.1:80
Timeout: 1000ms
Status: "running" | "stopped"
```

**Employee-Agent (Process Check):**
```javascript
Status: REMOVED (breaking news not core functionality)
```

---

## 📊 UI Details

### Design
- **Theme:** Dark mode with cyan accent (#00d9ff)
- **Font:** JetBrains Mono (monospace)
- **Backdrop:** Glass morphism (blur + transparency)
- **Animation:** Smooth transitions (0.3s ease)
- **Responsive:** Mobile-friendly

### Status Indicators

```
🟢 RUNNING    - Service responding on port
🔴 STOPPED    - Port unreachable / process not found
⚪ UNKNOWN    - Status indeterminate
```

---

## 🛠️ Troubleshooting

### Dashboard won't load

```powershell
# Check if Node is installed
node --version

# Try manual start
cd C:\Users\faceb\.openclaw\workspace
node apex-controller.js
```

### Services won't start

```powershell
# Verify PowerShell execution policy
Get-ExecutionPolicy

# If restricted, temporarily allow:
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Then try again:
.\apex-startup.ps1 -Mode start
```

### Port already in use

```powershell
# Check what's using port 3001
netstat -ano | findstr :3001

# Kill process (if safe):
taskkill /PID <PID> /F
```

---

## 💾 Startup Integration

### Option 1: Manual Launch
```powershell
.\launch-controller.ps1
```

### Option 2: Windows Task Scheduler
Create scheduled task to run on login:
```powershell
$action = New-ScheduledTaskAction -Execute powershell.exe -Argument "-NoProfile -ExecutionPolicy Bypass -File C:\Users\faceb\.openclaw\workspace\launch-controller.ps1"
$trigger = New-ScheduledTaskTrigger -AtLogon
Register-ScheduledTask -TaskName "APEX-Controller" -Action $action -Trigger $trigger -RunLevel Highest
```

### Option 3: Batch Script
```batch
@echo off
cd C:\Users\faceb\.openclaw\workspace
node apex-controller.js
pause
```

---

## 📈 Future Enhancements

- [ ] Service logs viewer (real-time output)
- [ ] Performance metrics (CPU, memory, latency)
- [ ] Service configuration editor
- [ ] Multi-user access control
- [ ] Discord/Telegram notifications on status change
- [ ] Historical uptime tracking
- [ ] Automated recovery (restart on crash)

---

## 🔐 Security Notes

- **Local-only:** Listens on 127.0.0.1:3001 (not exposed to network)
- **No authentication:** Intended for local/admin use only
- **PowerShell execution:** Requires execution policy bypass (Windows security)
- **Command injection:** All user inputs validated before execution

---

## 📝 Usage Examples

### Start all services
```
1. Open http://localhost:3001
2. Click "▶ Start"
3. Wait 3-5 seconds
4. Verify: Gateway ✓, Nerve ✓, Employee-Agent ✓
```

### Restart after config change
```
1. Click "↻ Restart"
2. Services will gracefully stop
3. Services will automatically start
4. Status updates in real-time
```

### Monitor service health
```
1. Dashboard auto-refreshes every 5 seconds
2. Status indicators show live status
3. Click "🔄 Refresh" for immediate update
```

---

**Version:** 1.0  
**Created:** 2026-02-24  
**Status:** Production Ready

---

## 📞 Support

For issues with:
- **APEX services:** See `apex-startup.ps1` documentation
- **Controller dashboard:** Check Node.js installation
- **Port conflicts:** Use `netstat -ano` to diagnose
