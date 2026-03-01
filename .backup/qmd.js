#!/usr/bin/env node

/**
 * APEX QMD (Query-Memory-Data) System
 * SQLite + FTS5 for indexed memory storage with vector search
 */

const path = require('path');
const fs = require('fs');

class QMD {
  constructor(dbPath = null) {
    this.dbPath = dbPath || path.join(process.cwd(), 'memory', 'qmd.db');
    this.db = null;
    this.SQL = null;
  }

  async init() {
    const sqlite3 = await import('sqlite3').then(m => m.default || m);
    this.SQL = await import('sql.js').then(m => m.default || m);
    
    // Ensure directory exists
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Initialize SQL.js
    const SQL = this.SQL;
    this.db = new SQL.Database();
    
    // Create tables
    this.db.run(`
      CREATE TABLE IF NOT EXISTS entries (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        metadata TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER DEFAULT (strftime('%s', 'now'))
      );
    `);

    this.db.run(`
      CREATE VIRTUAL TABLE IF NOT EXISTS entries_fts USING fts5(
        content,
        metadata,
        content='entries',
        content_rowid='rowid'
      );
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        color TEXT
      );
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS entry_tags (
        entry_id TEXT,
        tag_id TEXT,
        PRIMARY KEY (entry_id, tag_id),
        FOREIGN KEY (entry_id) REFERENCES entries(id),
        FOREIGN KEY (tag_id) REFERENCES tags(id)
      );
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS relations (
        source_id TEXT,
        target_id TEXT,
        relation_type TEXT,
        PRIMARY KEY (source_id, target_id, relation_type),
        FOREIGN KEY (source_id) REFERENCES entries(id),
        FOREIGN KEY (target_id) REFERENCES entries(id)
      );
    `);

    // Save to file
    this.save();
    
    console.log('✅ QMD initialized at', this.dbPath);
    return this;
  }

  save() {
    const data = this.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(this.dbPath, buffer);
  }

  // Entry operations
  addEntry(id, content, metadata = {}) {
    const stmt = this.db.prepare(
      'INSERT OR REPLACE INTO entries (id, content, metadata, updated_at) VALUES (?, ?, ?, strftime("%s", "now"))'
    );
    stmt.run([id, content, JSON.stringify(metadata)]);
    stmt.free();
    
    // Update FTS
    this.db.run(
      'INSERT OR REPLACE INTO entries_fts (rowid, content, metadata) VALUES (last_insert_rowid(), ?, ?)',
      [content, JSON.stringify(metadata)]
    );
    
    this.save();
    return { id, content, metadata };
  }

  getEntry(id) {
    const stmt = this.db.prepare('SELECT * FROM entries WHERE id = ?');
    stmt.bind([id]);
    
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return { ...row, metadata: JSON.parse(row.metadata || '{}') };
    }
    stmt.free();
    return null;
  }

  updateEntry(id, content, metadata = {}) {
    return this.addEntry(id, content, metadata);
  }

  deleteEntry(id) {
    this.db.run('DELETE FROM entries WHERE id = ?', [id]);
    this.db.run('DELETE FROM entry_tags WHERE entry_id = ?', [id]);
    this.db.run('DELETE FROM relations WHERE source_id = ? OR target_id = ?', [id, id]);
    this.save();
  }

  // Search operations
  search(query, limit = 10) {
    const results = [];
    const stmt = this.db.prepare(`
      SELECT entries.*, rank
      FROM entries_fts
      JOIN entries ON entries_fts.rowid = entries.rowid
      WHERE entries_fts MATCH ?
      ORDER BY rank
      LIMIT ?
    `);
    stmt.bind([query, limit]);
    
    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push({ ...row, metadata: JSON.parse(row.metadata || '{}') });
    }
    stmt.free();
    return results;
  }

  timeline(from = null, to = null, limit = 100) {
    let query = 'SELECT * FROM entries';
    const params = [];
    
    if (from || to) {
      query += ' WHERE ';
      if (from) {
        query += 'created_at >= ?';
        params.push(Math.floor(new Date(from).getTime() / 1000));
      }
      if (from && to) query += ' AND ';
      if (to) {
        query += 'created_at <= ?';
        params.push(Math.floor(new Date(to).getTime() / 1000));
      }
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);
    
    const results = [];
    const stmt = this.db.prepare(query);
    stmt.bind(params);
    
    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push({ ...row, metadata: JSON.parse(row.metadata || '{}') });
    }
    stmt.free();
    return results;
  }

  // Tag operations
  addTag(name, color = null) {
    const id = 'tag_' + Date.now();
    this.db.run('INSERT OR IGNORE INTO tags (id, name, color) VALUES (?, ?, ?)', [id, name, color]);
    this.save();
    return { id, name, color };
  }

  tagEntry(entryId, tagName) {
    // Get or create tag
    let tag = this.db.prepare('SELECT * FROM tags WHERE name = ?').bind([tagName]);
    if (!tag.step()) {
      const newTag = this.addTag(tagName);
      tagId = newTag.id;
    } else {
      const tagRow = tag.getAsObject();
      tagId = tagRow.id;
    }
    tag.free();
    
    this.db.run('INSERT OR IGNORE INTO entry_tags (entry_id, tag_id) VALUES (?, ?)', [entryId, tagId]);
    this.save();
  }

  getEntriesByTag(tagName, limit = 50) {
    const results = [];
    const stmt = this.db.prepare(`
      SELECT e.* FROM entries e
      JOIN entry_tags et ON e.id = et.entry_id
      JOIN tags t ON et.tag_id = t.id
      WHERE t.name = ?
      ORDER BY e.created_at DESC
      LIMIT ?
    `);
    stmt.bind([tagName, limit]);
    
    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push({ ...row, metadata: JSON.parse(row.metadata || '{}') });
    }
    stmt.free();
    return results;
  }

  // Relation operations
  relate(sourceId, targetId, relationType = 'related') {
    this.db.run(
      'INSERT OR IGNORE INTO relations (source_id, target_id, relation_type) VALUES (?, ?, ?)',
      [sourceId, targetId, relationType]
    );
    this.save();
  }

  getRelated(entryId, relationType = null, limit = 20) {
    const results = [];
    let query = `
      SELECT e.* FROM entries e
      JOIN relations r ON e.id = r.target_id
      WHERE r.source_id = ?
    `;
    const params = [entryId];
    
    if (relationType) {
      query += ' AND r.relation_type = ?';
      params.push(relationType);
    }
    
    query += ' LIMIT ?';
    params.push(limit);
    
    const stmt = this.db.prepare(query);
    stmt.bind(params);
    
    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push({ ...row, metadata: JSON.parse(row.metadata || '{}') });
    }
    stmt.free();
    return results;
  }

  // Context retrieval (entry + related + tags)
  getContext(entryId) {
    const entry = this.getEntry(entryId);
    if (!entry) return null;
    
    const related = this.getRelated(entryId);
    const tags = this.getTagsForEntry(entryId);
    
    return { entry, related, tags };
  }

  getTagsForEntry(entryId) {
    const results = [];
    const stmt = this.db.prepare(`
      SELECT t.* FROM tags t
      JOIN entry_tags et ON t.id = et.tag_id
      WHERE et.entry_id = ?
    `);
    stmt.bind([entryId]);
    
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  }

  // Bootstrap from existing memory files
  async bootstrap(memoryDir) {
    const files = fs.readdirSync(memoryDir).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(memoryDir, file), 'utf-8');
      const id = 'boot_' + file.replace('.md', '');
      this.addEntry(id, content, { source: file, bootstrapped: true });
    }
    
    return { imported: files.length };
  }

  // Deduplication
  deduplicate() {
    // Find duplicate content hashes
    const duplicates = [];
    const stmt = this.db.prepare(`
      SELECT content, COUNT(*) as cnt, GROUP_CONCAT(id) as ids
      FROM entries
      GROUP BY content
      HAVING cnt > 1
    `);
    
    while (stmt.step()) {
      const row = stmt.getAsObject();
      const ids = row.ids.split(',');
      // Keep first, mark others for deletion
      duplicates.push({ keep: ids[0], remove: ids.slice(1) });
    }
    stmt.free();

    // Remove duplicates
    for (const dup of duplicates) {
      for (const id of dup.remove) {
        this.deleteEntry(id);
      }
    }
    
    return { duplicates: duplicates.length };
  }

  close() {
    this.save();
    this.db.close();
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  const qmd = new QMD();
  await qmd.init();

  switch (command) {
    case 'add':
      const [id, ...contentParts] = args.slice(1);
      console.log(qmd.addEntry(id, contentParts.join(' ')));
      break;
      
    case 'get':
      console.log(qmd.getEntry(args[1]));
      break;
      
    case 'search':
      console.log(qmd.search(args.slice(1).join(' ')));
      break;
      
    case 'timeline':
      console.log(qmd.timeline());
      break;
      
    case 'tag':
      qmd.tagEntry(args[1], args[2]);
      console.log('Tagged');
      break;
      
    case 'relate':
      qmd.relate(args[1], args[2], args[3] || 'related');
      console.log('Related');
      break;
      
    case 'context':
      console.log(qmd.getContext(args[1]));
      break;
      
    case 'bootstrap':
      console.log(await qmd.bootstrap(args[1] || './memory'));
      break;
      
    case 'dedupe':
      console.log(qmd.deduplicate());
      break;
      
    default:
      console.log('QMD CLI');
      console.log('Commands: add, get, search, timeline, tag, relate, context, bootstrap, dedupe');
  }

  qmd.close();
}

module.exports = { QMD };

if (require.main === module) {
  main().catch(console.error);
}
