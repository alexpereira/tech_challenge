module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST || 'recruitingdb.cbat2r5rspoh.us-east-1.rds.amazonaws.com',
      user : process.env.DB_USER || 'recruiting',
      password : process.env.DB_PASSWORD || 'recruiting123',
      database : process.env.DB_DATABASE || 'recruitingDB'
    }
  }
};
