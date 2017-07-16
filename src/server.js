/**
 * Created by championswimmer on 16/07/17.
 */
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const PARSE_CONFIG = require('../parse-config');

const express = require('express');
const app = express();

const parsePgServer = new ParseServer({
  databaseURI: PARSE_CONFIG.DATABASE_URL,
  appId: PARSE_CONFIG.APP_ID,
  serverURL: `http://localhost:${PARSE_CONFIG.PORT}/pg`,
  masterKey: PARSE_CONFIG.MASTER_KEY
});
const parseMongoServer = new ParseServer({
  databaseURI: PARSE_CONFIG.MONGODB_URI,
  appId: PARSE_CONFIG.APP_ID,
  serverURL: `http://localhost:${PARSE_CONFIG.PORT}/mongo`,
  masterKey: PARSE_CONFIG.MASTER_KEY
});

const parseDashboard = new ParseDashboard({
  apps: [
    {
      serverURL: `http://localhost:${PARSE_CONFIG.PORT}/pg`,
      appId: PARSE_CONFIG.APP_ID,
      masterKey: PARSE_CONFIG.MASTER_KEY,
      appName: PARSE_CONFIG.APP_NAME + ' PostgreSQL'
    },
    {
      serverURL: `http://localhost:${PARSE_CONFIG.PORT}/mongo`,
      appId: PARSE_CONFIG.APP_ID,
      masterKey: PARSE_CONFIG.MASTER_KEY,
      appName: PARSE_CONFIG.APP_NAME + ' MongoDB'
    }
  ],
  users: [
    {user: 'parse', pass: '$2y$10$k00HQT0vCcwQIpi12FYVcuMi.vd.puICn0CjL31s3wooWqFVvtz12'}
  ],
  useEncryptedPasswords: true,
  trustProxy: 1
});

app.use('/pg', parsePgServer);
app.use('/mongo', parseMongoServer);
app.use('/dashboard', parseDashboard);

module.exports = exports = app;