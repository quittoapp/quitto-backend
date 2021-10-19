import { EntityRepository, LessThanOrEqual, Repository } from 'typeorm'
import { SmokingPermission } from './entities/smoking-permission.entity'

@EntityRepository(SmokingPermission)
export class SmokingPermissionRepository extends Repository<SmokingPermission> {
  public getExpired(date: Date) {
    return this.find({ where: { date: LessThanOrEqual(date) } })
  }
}
