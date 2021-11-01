import { groupBy } from 'lodash'
import { SmokingPermission } from 'src/smoking-permission/entities/smoking-permission.entity'
import { EntityRepository, In, Repository } from 'typeorm'
import { DailySmokingReport } from './entities/daily-smoking-report.entity'

@EntityRepository(DailySmokingReport)
export class DailySmokingReportRepository extends Repository<DailySmokingReport> {
  public async increaseAmountOfSmokedCigarettes(expiredSmokingPermissions: SmokingPermission[]) {
    const userIdToExpiredPermissions = groupBy(expiredSmokingPermissions, 'user.id') as any
    const userIds = Object.keys(userIdToExpiredPermissions).map(Number)

    const currentSmokingReports = await this.createQueryBuilder('report')
      .select('report.*')
      .innerJoin(
        (qb) =>
          qb
            .select('max(date) as date, "userId"')
            .from(DailySmokingReport, 'tr')
            .groupBy('"userId"'),
        't',
        't.date = report.date AND t."userId" = report."userId"',
      )
      .where({ userId: In(userIds) })
      .getRawMany()

    for (const report of currentSmokingReports) {
      report.amountOfSmokedCigarettes += userIdToExpiredPermissions[report.userId].length
    }

    await this.save(currentSmokingReports)
  }
}
