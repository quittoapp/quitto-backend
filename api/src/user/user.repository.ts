import { EntityRepository, Repository } from 'typeorm'
import { User } from './entities/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public getByTimezoneOffset(timezoneOffset: number) {
    return this.find({ timezoneOffset })
  }
}
