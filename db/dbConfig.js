//const config = {
//  host: 'localhost',
//  user: 'postgres',
//  password: 'null',
//  database: 'sample_db',
//};

const config = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

module.exports = {
  config,
};
