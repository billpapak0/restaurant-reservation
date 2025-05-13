require('dotenv').config();
const db = require('./config/db');

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('Connected to MariaDB:', rows);
  } catch (error) {
    console.error('DB connection error:', error.message);
  }
})();
