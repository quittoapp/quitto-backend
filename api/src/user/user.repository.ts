import { EntityRepository, Repository } from 'typeorm'
import { User } from './entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public getByTimezoneOffset(timezoneOffset: number) {
    return this.find({ where: { timezoneOffset }, relations: ['timeWindow'] })
  }

  public getWithTimeWindow(id: number) {
    return this.findOne({ where: { id }, relations: ['timeWindow'] })
  }
}
