import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Time } from 'src/time/time'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { FinishSignUpRequestBodyDTO } from './dto/finish-sign-up.request-body.dto'
import { UpdateUserRequestBodyDTO } from './dto/update-user.request-body.dto'
import { TimeWindow } from './entities/time-window.entity'
import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'

const DEFAULT_TIME_WINDOW_START = new Time(10, 0).toString()
const DEFAULT_TIME_WINDOW_END = new Time(23, 55).toString()

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public create(user: User) {
    return this.userRepository.save(user)
  }

  @Transaction()
  public async finishSignUp(
    userId: number,
    info: FinishSignUpRequestBodyDTO,
    @TransactionManager() manager?: EntityManager,
  ) {
    const userRepository = manager!.getCustomRepository(UserRepository)
    const user = await userRepository.findOneOrFail(userId)

    const newTimeWindow = new TimeWindow()
    newTimeWindow.from = info.timeWindowStartTime
    newTimeWindow.to = info.timeWindowEndTime
    user.timeWindow = newTimeWindow

    user.cigarettesPerDay = info.cigarettesPerDay
    user.timezoneOffset = info.timezoneOffset
    user.fcmToken = info.fcmToken
    user.hasFinishedRegistration = true

    return userRepository.save(user)
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

  @Transaction()
  public async updateUser(
    id: number,
    updateUserDTO: UpdateUserRequestBodyDTO,
    @TransactionManager() manager?: EntityManager,
  ) {
    const userRepository = manager!.getCustomRepository(UserRepository)
    const user = await userRepository.getWithTimeWindow(id)
    const { timeWindowEndTime, timeWindowStartTime, ...userPatch } = updateUserDTO

    user?.timeWindow.update({ from: timeWindowStartTime, to: timeWindowEndTime })

    const patchedUser = {
      ...user,
      ...userPatch,
    }

    return userRepository.save(patchedUser)
  }
}
