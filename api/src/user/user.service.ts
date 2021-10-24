import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Time } from 'src/time/time'
import { FinishSignUpDTO } from './dto/finish-sign-up.dto'
import { TimeWindow } from './entities/time-window.entity'
import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'

const DEFAULT_TIME_WINDOW_START = new Time(10, 0, 0).toString()
const DEFAULT_TIME_WINDOW_END = new Time(23, 55, 0).toString()

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public create(user: User) {
    return this.userRepository.save(user)
  }

  public finishSignUp(userId: number, info: FinishSignUpDTO) {
    return this.userRepository.update(userId, info)
  }

  public makeDefaultTimeWindowForUser(user: User) {
    const timeWindow = new TimeWindow()
    timeWindow.from = DEFAULT_TIME_WINDOW_START
    timeWindow.to = DEFAULT_TIME_WINDOW_END
    timeWindow.user = user
    return timeWindow
  }

  public getByEmail(email: string) {
    return this.userRepository.findOne({ email })
  }

  public getById(id: number) {
    return this.userRepository.findOne(id)
  }

  public getByTimezoneOffset(timezoneOffset: number) {
    return this.userRepository.getByTimezoneOffset(timezoneOffset)
  }
}
