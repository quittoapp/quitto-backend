const { config } = require('./dist/src/config')

module.exports = {
  type: 'postgres',
  host: config.databaseHost,
  port: config.databasePort,
  username: config.databaseUserName,
  password: config.databasePassword,
  database: config.databaseName,
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  entities: ['./dist/**/*.entity.js'],
  synchronize: true,
}
