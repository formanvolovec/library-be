export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'eugene',
    password: process.env.DB_PASSWORD || 'gachimuchi',
    database: process.env.DB_NAME || 'library',
  },
});
