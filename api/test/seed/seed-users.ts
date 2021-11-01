import { User } from 'src/user/entities/user.entity'
import { createFakeUser } from 'test/factories/create-user'
import { getConnection } from 'typeorm'

export async function seedUsers({ amount = 5 } = {}) {
  const connection = getConnection()
  const users = Array(amount)
    .fill(null)
    .map(() => createFakeUser())

  await connection.getRepository(User).save(users)
}
