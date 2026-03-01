#!/usr/bin/env node

/**
 * 🧬 Capability Evolver - Main Entry Point
 * 
 * A self-evolution engine for AI agents. Analyzes runtime history 
 * to identify improvements and introduces randomized "mutations" 
 * to break local optima.
 * 
 * Usage:
 *   node index.js          # Single run
 *   node index.js --loop   # Mad Dog Mode (continuous)
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || '/root/.openclaw/workspace';
const evolve = require('./evolve');

const args = process.argv.slice(2);
const isLoop = args.includes('--loop');

console.log('🧬 Capability Evolver v2.0 - Ascension Protocol');
console.log('================================================\n');

async function run() {
    console.log(`📂 Workspace: ${WORKSPACE}`);
    console.log(`🔄 Mode: ${isLoop ? 'Mad Dog (Continuous)' : 'Single Run'}\n`);
    
    try {
        await evolve.introspect();
        await evolve.evolve();
        await evolve.persist();
        console.log('\n✅ Evolution cycle complete');
    } catch (err) {
        console.error('\n❌ Evolution failed:', err.message);
        process.exit(1);
    }
}

async function loop() {
    console.log('🐕 Mad Dog Mode: Running continuous self-healing loop');
    console.log('   Press Ctrl+C or `kill -9 <pid>` to stop\n');
    
    let iteration = 1;
    while (true) {
        console.log(`\n--- Iteration ${iteration} ---`);
        try {
            await evolve.introspect();
            await evolve.evolve();
            await evolve.persist();
            console.log(`✅ Iteration ${iteration} complete`);
        } catch (err) {
            console.error(`❌ Iteration ${iteration} failed:`, err.message);
        }
        
        iteration++;
        await new Promise(r => setTimeout(r, 60000)); // Wait 1 minute between runs
    }
}

if (isLoop) {
    loop();
} else {
    run();
}
