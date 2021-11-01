/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const { config } = require('./dist/config')

const entitiesPath =
  process.env.NODE_ENV === 'test'
    ? path.resolve(__dirname, '**/*.entity.ts')
    : path.resolve(__dirname, '**/*.entity.js')

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
  entities: [entitiesPath],
  synchronize: true,
}
