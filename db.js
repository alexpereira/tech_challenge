import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: {
    host : 'recruitingdb.cbat2r5rspoh.us-east-1.rds.amazonaws.com',
    user : 'recruiting',
    password : 'recruiting123',
    database : 'recruitingDB'
  }
});

export default db;
