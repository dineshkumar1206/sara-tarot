const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'sara-tarot-db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3307,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    define: {
      timestamps: true
    }
  }
);

module.exports = sequelize;
