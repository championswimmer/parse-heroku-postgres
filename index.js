/**
 * Created by championswimmer on 16/07/17.
 */
const app = require('./src/server');
const PARSE_CONFIG = require('./parse-config');

app.listen(PARSE_CONFIG.PORT, () => {
  console.info(
    `
    Parse server and dashboard running - 
    Postgres-based Parse API : http://localhost:${PARSE_CONFIG.PORT}/pg
    MongoDB-based Parse API  : http://localhost:${PARSE_CONFIG.PORT}/mongo
    Dashboard                : http://localhost:${PARSE_CONFIG.PORT}/dashboard
    
     `);
});
