import { DailySmokingReport } from 'src/daily-smoking-report/entities/daily-smoking-report.entity'
import { SmokingPermission } from 'src/smoking-permission/entities/smoking-permission.entity'
import { User } from 'src/user/entities/user.entity'
import {
  createExpiredSmokingPermissions,
  createSmokingPermissions,
} from 'test/factories/create-smoking-permissions'
import { getConnection } from 'typeorm'

export async function seedSmokingPermissions(user: User) {
  const connection = getConnection()
  const permissions = createSmokingPermissions(new Date(), user)
  const dailySmokingReport = new DailySmokingReport(user, new Date())

  await connection.getRepository(SmokingPermission).save(permissions)
  await connection.getRepository(DailySmokingReport).save(dailySmokingReport)
}

export async function seedExpiredSmokingPermissions(user: User) {
  const connection = getConnection()
  const permissions = createExpiredSmokingPermissions(new Date(), user)
  const dailySmokingReport = new DailySmokingReport(user, new Date())

  await connection.getRepository(SmokingPermission).save(permissions)
  await connection.getRepository(DailySmokingReport).save(dailySmokingReport)
}
