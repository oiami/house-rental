const client = require('knex')({
  client: 'pg',
  connection: {
    user: 'postgres',
    host: 'localhost',
    database: 'house_rental',
    password: 'postgres',
    port: 5432
  }
});

module.exports = (req, res, next) => {
  req.db = client;
  next();
};
