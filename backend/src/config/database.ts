import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.DB_NAME || 'chatdb',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging for cleaner output
  }
);

export default db;
