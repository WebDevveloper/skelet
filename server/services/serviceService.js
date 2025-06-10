const { pool } = require('../config/db');

async function selectServices() {
  const [rows] = await pool.query(
    'SELECT id, name FROM services'
  );
  return rows;
}

module.exports = { selectServices };
