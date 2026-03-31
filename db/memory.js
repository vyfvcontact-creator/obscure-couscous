const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('../config');

class MemoryDB {
  constructor() {
    this.db = new sqlite3.Database(config.dbPath);
    this.init();
  }

  init() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS user_memory (
        user_id TEXT PRIMARY KEY,
        last_question TEXT,
        context TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  saveUserContext(userId, lastQuestion, context) {
    this.db.run(
      `INSERT OR REPLACE INTO user_memory (user_id, last_question, context) VALUES (?, ?, ?)`,
      [userId, lastQuestion, context]
    );
  }

  getUserContext(userId) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM user_memory WHERE user_id = ?`,
        [userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = new MemoryDB();