/**
 * 🧬 Capability Evolver - Evolution Engine
 * 
 * Core logic for introspecting, evolving, and persisting improvements.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || '/root/.openclaw/workspace';
const KNOWLEDGE_BASE = path.join(WORKSPACE, 'memory', 'KNOWLEDGE_BASE');

/**
 * Scan recent logs for errors and patterns
 */
async function introspect() {
    console.log('🔍 Phase 1: Introspection');
    console.log('===================');
    
    const findings = {
        errors: [],
        corrections: [],
        patterns: []
    };
    
    // Scan session logs
    const logsDir = path.join(WORKSPACE, 'memory', 'logs');
    if (fs.existsSync(logsDir)) {
        const files = fs.readdirSync(logsDir)
            .filter(f => f.endsWith('.md'))
            .sort()
            .reverse()
            .slice(0, 5); // Last 5 files
        
        for (const file of files) {
            const content = fs.readFileSync(path.join(logsDir, file), 'utf8');
            
            // Extract errors
            const errorMatches = content.match(/Error:|Exception:|failed|❌/gi) || [];
            if (errorMatches.length > 0) {
                findings.errors.push({ file, count: errorMatches.length });
            }
            
            // Extract corrections
            const correctionMatches = content.match(/corrected|fixed|actually|instead/gi) || [];
            if (correctionMatches.length > 0) {
                findings.corrections.push({ file, count: correctionMatches.length });
            }
        }
    }
    
    // Scan daily memory
    const memoryDir = path.join(WORKSPACE, 'memory');
    if (fs.existsSync(memoryDir)) {
        const today = new Date().toISOString().split('T')[0];
        const dailyFile = path.join(memoryDir, `${today}.md`);
        
        if (fs.existsSync(dailyFile)) {
            const content = fs.readFileSync(dailyFile, 'utf8');
            
            // Look for error patterns
            const errorPatterns = [
                /exec.*approval/i,
                /permission denied/i,
                /not found/i,
                /failed to/i,
                /could not/i
            ];
            
            for (const pattern of errorPatterns) {
                if (pattern.test(content)) {
                    findings.patterns.push(pattern.source);
                }
            }
        }
    }
    
    // Report findings
    console.log(`📊 Found ${findings.errors.length} error entries`);
    console.log(`📊 Found ${findings.corrections.length} corrections`);
    console.log(`📊 Found ${findings.patterns.length} patterns`);
    
    // Store findings globally
    global.__evolverFindings = findings;
    
    return findings;
}

/**
 * Apply fixes, crystallize knowledge, promote to core docs
 */
async function evolve() {
    console.log('\n🛠️ Phase 2: Evolution');
    console.log('===================');
    
    const findings = global.__evolverFindings || { errors: [], corrections: [], patterns: [] };
    const actions = [];
    
    // Fix 1: Update exec-approvals.json if needed
    const approvalsFile = path.join(WORKSPACE, '.openclaw', 'exec-approvals.json');
    if (fs.existsSync(approvalsFile)) {
        try {
            const approvals = JSON.parse(fs.readFileSync(approvalsFile, 'utf8'));
            if (approvals.pending && approvals.pending.length > 0) {
                console.log(`⚠️  ${approvals.pending.length} exec approvals pending`);
            }
        } catch (e) {
            // Ignore parse errors
        }
    }
    
    // Crystallize: Write lessons learned
    if (findings.corrections.length > 0 || findings.errors.length > 0) {
        await crystallize(findings);
        actions.push('crystallized');
    }
    
    // Fix: Repair known issues
    if (findings.errors.some(e => e.file && e.file.includes('git'))) {
        await fixGitIssues();
        actions.push('git-fix');
    }
    
    // Check for promotion candidates in memory/decisions
    await checkForPromotions();
    actions.push('promotion-check');
    
    console.log(`📝 Applied ${actions.length} evolution actions`);
    return actions;
}

/**
 * Write lessons to KNOWLEDGE_BASE
 */
async function crystallize(findings) {
    console.log('💎 Crystallizing knowledge...');
    
    if (!fs.existsSync(KNOWLEDGE_BASE)) {
        fs.mkdirSync(KNOWLEDGE_BASE, { recursive: true });
    }
    
    const lessonsFile = path.join(KNOWLEDGE_BASE, 'LESSONS_LEARNED.md');
    const timestamp = new Date().toISOString();
    
    let content = '';
    if (fs.existsSync(lessonsFile)) {
        content = fs.readFileSync(lessonsFile, 'utf8');
    } else {
        content = '# Lessons Learned\n\nKnowledge crystallized from runtime experience.\n\n';
    }
    
    // Add new lesson entry
    const entry = `
---

### ${timestamp}

**Type:** ${findings.errors.length > 0 ? 'Error Analysis' : 'Correction'}

**Findings:**
${findings.errors.map(e => `- ${e.count} errors in ${e.file}`).join('\n')}
${findings.corrections.map(c => `- ${c.count} corrections in ${c.file}`).join('\n')}

**Patterns Detected:**
${findings.patterns.map(p => `- ${p}`).join('\n') || 'None'}
`;
    
    // Append to file
    content += entry;
    fs.writeFileSync(lessonsFile, content);
    console.log(`✅ Written to ${lessonsFile}`);
}

/**
 * Fix common Git issues
 */
async function fixGitIssues() {
    console.log('🔧 Attempting Git fixes...');
    
    // Check for uncommitted changes
    try {
        const status = execSync('git status --porcelain', { 
            cwd: WORKSPACE, 
            encoding: 'utf8' 
        });
        
        if (status.trim()) {
            console.log('⚠️  Uncommitted changes detected');
            // Auto-commit if there are meaningful changes
            const timestamp = new Date().toISOString();
            execSync(`git add -A && git commit -m "Auto-commit: ${timestamp}"`, { 
                cwd: WORKSPACE 
            });
            console.log('✅ Auto-committed changes');
        }
    } catch (e) {
        // Git not available or other error
    }
}

/**
 * Check for items that should be promoted to core docs
 */
async function checkForPromotions() {
    console.log('📈 Checking for promotion candidates...');
    
    // Check decisions folder
    const decisionsDir = path.join(WORKSPACE, 'memory', 'decisions');
    if (fs.existsSync(decisionsDir)) {
        const files = fs.readdirSync(decisionsDir).filter(f => f.endsWith('.md'));
        console.log(`📁 ${files.length} decision records found`);
    }
    
    // Check learnings
    const learningsFile = path.join(WORKSPACE, '.learnings', 'LEARNINGS.md');
    if (fs.existsSync(learningsFile)) {
        const content = fs.readFileSync(learningsFile, 'utf8');
        const promoted = content.match(/promoted:\s*true/i);
        if (promoted) {
            console.log('⚠️  Items marked for promotion to core docs');
        }
    }
}

/**
 * Commit changes and sync
 */
async function persist() {
    console.log('\n💾 Phase 3: Persistence');
    console.log('===================');
    
    try {
        // Check for changes
        const status = execSync('git status --porcelain', { 
            cwd: WORKSPACE, 
            encoding: 'utf8' 
        });
        
        if (status.trim()) {
            const timestamp = new Date().toISOString();
            execSync(`git add -A && git commit -m "Evolution: ${timestamp}"`, { 
                cwd: WORKSPACE 
            });
            console.log('✅ Committed evolution changes');
        } else {
            console.log('ℹ️  No changes to commit');
        }
    } catch (e) {
        console.log('⚠️  Could not commit:', e.message);
    }
    
    console.log('💾 Persistence complete');
}

module.exports = { introspect, evolve, persist };
