const fs = require('node:fs');
const path = require('node:path');
const { Pool: PostgresPool } = require('pg');

const demoMode = process.env.DEMO_MODE === '1' && process.env.NODE_ENV !== 'production';
let demoDatabase;

async function getDemoDatabase() {
  if (!demoDatabase) {
    const { PGlite } = require('@electric-sql/pglite');
    demoDatabase = (async () => {
      const db = new PGlite();
      const sql = fs.readFileSync(path.join(__dirname, 'sample.sql'), 'utf8');
      await db.exec(sql);
      return db;
    })();
  }
  return demoDatabase;
}

class DemoPool {
  async query(sql, params) {
    const db = await getDemoDatabase();
    const result = await db.query(sql, params);
    return {
      rows: result.rows || [],
      rowCount: result.rows?.length || result.affectedRows || 0,
    };
  }

  async end() {
    // All routes share the in-memory database for the life of the process.
  }
}

function createPool() {
  if (demoMode) return new DemoPool();
  return new PostgresPool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: process.env.PSQL_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });
}

module.exports = { createPool, demoMode };
