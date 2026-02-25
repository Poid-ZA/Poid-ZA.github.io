## ⚠️ SECURITY NOTICE: Telegram Token Exposure (2026-02-21)

**Status:** REMEDIATED  
**Date Exposed:** 2026-02-21  
**Date Detected:** 2026-02-25  
**Duration:** ~4 days

### What Happened

Telegram bot token was accidentally committed in a configuration backup file in the OpenClaw repository and pushed to public GitHub.

### Exposure Details

- **Token:** `8588616837:AAGMMD2985iBDmUmt8Z7UnNJ43BMUdFs2aA` (NOW REVOKED)
- **Repository:** OpenClaw (github.com/Poid-ZA/OpenClaw)
- **Visibility:** Public (discoverable via git history search)
- **Impact:** Allowed token-based bot API access

### What We Did

1. ✅ **Token Revoked** — Old token immediately invalidated via Telegram BotFather
2. ✅ **Token Rotated** — New token generated and deployed
3. ✅ **Files Removed** — Config file removed from git tracking
4. ✅ **Preventive Controls:**
   - Enhanced `.gitignore` with credential patterns
   - Pre-commit hooks to prevent future commits
   - GitHub secret scanning enabled
   - `.env`-based secrets enforcement

### Current Status

- 🟢 **Active Tokens:** New tokens deployed and working
- 🟢 **Old Tokens:** Completely invalidated
- 🟡 **Git History:** Cleaned; GitHub cache may still serve old diffs
- 🟢 **Future Security:** Protected by automated controls

### For Users

**No action required.** The bot token has been rotated and is no longer valid. If you noticed any suspicious bot activity between 2026-02-21 and 2026-02-25, please report it.

### For Developers

**Lessons Learned:**
- Never commit config files with secrets (use `.env`)
- Always add credential patterns to `.gitignore`
- Implement pre-commit hooks to catch secrets
- Enable GitHub secret scanning on all repos
- Rotate secrets immediately upon discovery

**Reference Documents:**
- `PLAYBOOKS/SECRET_ROTATION.md` — Rotation procedure
- `REGRESSION/detect-telegram-token.sh` — Prevention test
- Full incident analysis in OpenClaw repo

---

**Timeline:** Incident detected within 4 days; mitigation completed same day  
**Escalation:** GitHub support requested for cache purge  
**Monitoring:** 24-hour observation period for unauthorized access attempts
