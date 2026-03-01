#!/usr/bin/env node

/**
 * APEX QMD Vector Search System
 * SQLite + FTS5 + Sentence Embeddings for semantic search
 */

const http = require('http');
const path = require('path');
const fs = require('fs');
const { QMD } = require('./qmd.js');

class QMDVector extends QMD {
  constructor(dbPath = null) {
    super(dbPath);
    this.embeddingModel = null;
    this.embeddingsTable = null;
  }

  async init() {
    await super.init();
    
    // Add embeddings table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS embeddings (
        entry_id TEXT PRIMARY KEY,
        vector BLOB NOT NULL,
        model TEXT DEFAULT 'simple',
        FOREIGN KEY (entry_id) REFERENCES entries(id)
      );
    `);
    
    this.save();
    console.log('✅ QMD Vector initialized');
    return this;
  }

  // Generate embedding (simple hash-based for now, can be upgraded to actual embeddings)
  async generateEmbedding(text) {
    // Simple hash-based vector for demonstration
    // In production, integrate with OpenAI embeddings API or local model
    const hash = this.simpleHash(text);
    const vector = new Array(1536).fill(0);
    
    // Distribute hash across vector dimensions
    for (let i = 0; i < vector.length; i++) {
      vector[i] = Math.sin(hash * (i + 1)) * Math.cos(hash * (i + 1));
    }
    
    // Normalize
    const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
    return vector.map(v => v / magnitude);
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  // Store embedding for entry
  async embedEntry(entryId, text = null) {
    const entry = text ? { content: text } : this.getEntry(entryId);
    if (!entry) return null;
    
    const vector = await this.generateEmbedding(entry.content);
    
    // Store as binary blob
    const buffer = Buffer.from(new Float32Array(vector).buffer);
    this.db.run(
      'INSERT OR REPLACE INTO embeddings (entry_id, vector, model) VALUES (?, ?, ?)',
      [entryId, buffer, 'simple']
    );
    this.save();
    
    return { entryId, embedded: true };
  }

  // Cosine similarity between two vectors
  cosineSimilarity(a, b) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Semantic search using embeddingsSearch(query, limit = 10) {
    // First, get F
  async semanticTS results for quick filtering
    const ftsResults = this.search(query, limit * 3);
    
    if (ftsResults.length === 0) return [];
    
    // Generate query embedding
    const queryVector = await this.generateEmbedding(query);
    
    // Score each result by semantic similarity
    const scored = [];
    
    for (const entry of ftsResults) {
      // Get embedding
      const embStmt = this.db.prepare('SELECT vector FROM embeddings WHERE entry_id = ?');
      embStmt.bind([entry.id]);
      
      if (embStmt.step()) {
        const row = embStmt.getAsObject();
        const vector = new Float32Array(row.vector.buffer);
        const similarity = this.cosineSimilarity(queryVector, Array.from(vector));
        
        scored.push({ ...entry, similarity });
      }
      embStmt.free();
    }
    
    // Sort by similarity and return top results
    scored.sort((a, b) => b.similarity - a.similarity);
    return scored.slice(0, limit);
  }

  // Add entry with automatic embedding
  async addEntry(id, content, metadata = {}) {
    const result = super.addEntry(id, content, metadata);
    await this.embedEntry(id);
    return result;
  }

  // Re-embed all entries
  async reindex() {
    const entries = this.timeline(limit = 1000);
    let embedded = 0;
    
    for (const entry of entries) {
      await this.embedEntry(entry.id);
      embedded++;
    }
    
    return { total: entries.length, embedded };
  }
}

// API Server
class QMDServer {
  constructor(qmd, port = 18790) {
    this.qmd = qmd;
    this.port = port;
    this.server = null;
  }

  start() {
    this.server = http.createServer(async (req, res) => {
      // CORS
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      const url = new URL(req.url, `http://localhost:${this.port}`);
      const path = url.pathname;
      const method = req.method;

      try {
        // Routes
        if (path === '/api/qmd/search' && method === 'GET') {
          const query = url.searchParams.get('q') || '';
          const limit = parseInt(url.searchParams.get('limit')) || 10;
          const semantic = url.searchParams.get('semantic') === 'true';
          
          const results = semantic 
            ? await this.qmd.semanticSearch(query, limit)
            : this.qmd.search(query, limit);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(results));
          return;
        }

        if (path === '/api/qmd/timeline' && method === 'GET') {
          const from = url.searchParams.get('from');
          const to = url.searchParams.get('to');
          const limit = parseInt(url.searchParams.get('limit')) || 100;
          
          const results = this.qmd.timeline(from, to, limit);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(results));
          return;
        }

        if (path === '/api/qmd/entries' && method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            const { id, content, metadata } = JSON.parse(body);
            const result = this.qmd.addEntry(id, content, metadata);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          });
          return;
        }

        if (path.startsWith('/api/qmd/entry/') && method === 'GET') {
          const id = path.split('/').pop();
          const entry = this.qmd.getEntry(id);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(entry));
          return;
        }

        if (path === '/api/qmd/tags' && method === 'GET') {
          // List all tags
          const results = [];
          const stmt = this.qmd.db.prepare('SELECT * FROM tags');
          while (stmt.step()) {
            results.push(stmt.getAsObject());
          }
          stmt.free();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(results));
          return;
        }

        if (path === '/api/qmd/entry-tags' && method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            const { entryId, tagName } = JSON.parse(body);
            this.qmd.tagEntry(entryId, tagName);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          });
          return;
        }

        if (path === '/api/qmd/relate' && method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            const { sourceId, targetId, relationType } = JSON.parse(body);
            this.qmd.relate(sourceId, targetId, relationType);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          });
          return;
        }

        if (path.startsWith('/api/qmd/context/') && method === 'GET') {
          const id = path.split('/').pop();
          const context = this.qmd.getContext(id);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(context));
          return;
        }

        if (path === '/api/qmd/bootstrap' && method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            const { memoryDir } = JSON.parse(body || '{}');
            const result = await this.qmd.bootstrap(memoryDir || './memory');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          });
          return;
        }

        if (path === '/api/qmd/dedupe' && method === 'POST') {
          const result = this.qmd.deduplicate();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
          return;
        }

        if (path === '/api/qmd/reindex' && method === 'POST') {
          const result = await this.qmd.reindex();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
          return;
        }

        // Health check
        if (path === '/health' && method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', qmd: 'vector' }));
          return;
        }

        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));

      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });

    this.server.listen(this.port, () => {
      console.log(`🚀 QMD API running on http://localhost:${this.port}`);
    });
  }

  stop() {
    if (this.server) {
      this.server.close();
    }
  }
}

// CLI with vector support
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const qmd = new QMDVector();
  await qmd.init();

  switch (command) {
    case 'serve':
      const server = new QMDServer(qmd, parseInt(args[1]) || 18790);
      server.start();
      break;

    case 'add':
      const [id, ...contentParts] = args.slice(1);
      console.log(await qmd.addEntry(id, contentParts.join(' ')));
      break;

    case 'search':
      console.log(await qmd.semanticSearch(args.slice(1).join(' ')));
      break;

    case 'reindex':
      console.log(await qmd.reindex());
      break;

    default:
      console.log('QMD Vector CLI');
      console.log('Commands: serve, add, search, reindex');
  }
}

module.exports = { QMDVector, QMDServer };

if (require.main === module) {
  main().catch(console.error);
}
