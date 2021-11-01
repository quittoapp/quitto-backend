import { GenericContainer, Wait } from 'testcontainers'

export async function spinUpDBContainer() {
  const dbContainer = await new GenericContainer('postgres')
    .withEnv('POSTGRES_PASSWORD', 'postgres')
    .withEnv('POSTGRES_USER', 'postgres')
    .withEnv('POSTGRES_DB', 'quitto')
    .withPortMappings({ 5432: 5433 })
    .withWaitStrategy(Wait.forLogMessage('database system is ready to accept connections'))
    .start()

  return dbContainer
}
