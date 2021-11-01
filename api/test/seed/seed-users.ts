import { User } from 'src/user/entities/user.entity'
import { createFakeUser } from 'test/factories/create-user'
import { getConnection } from 'typeorm'

export async function seedUsers(amount = 5, overrides: Partial<User> = {}) {
  const connection = getConnection()
  const users = Array(amount)
    .fill(null)
    .map(() => createFakeUser(overrides))

  return connection.getRepository(User).save(users)
}

export async function seedUser(overrides: Partial<User>) {
  const [user] = await seedUsers(1, overrides)
  return user
}
