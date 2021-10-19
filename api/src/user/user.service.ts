import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Time } from 'src/time/time'
import { Repository } from 'typeorm'
import { CreateUserDTO } from './dto/create-user.dto'
import { TimeWindow } from './entities/time-window.entity'
import { User } from './entities/user.entity'

const DEFAULT_TIME_WINDOW_START = new Time(10, 0, 0).toString()
const DEFAULT_TIME_WINDOW_END = new Time(23, 55, 0).toString()

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneOrCreate(createUserDto: CreateUserDTO) {
    const existingUser = await this.userRepository.findOne({
      email: createUserDto.email,
    })

    if (existingUser) {
      return existingUser
    }

    return this.create(createUserDto)
  }

  private create(createUserDto: CreateUserDTO) {
    const user = new User()
    user.email = createUserDto.email
    user.fullName = createUserDto.email
    user.photoUrl = createUserDto.photoUrl
    user.timezoneOffset = createUserDto.timezoneOffset
    user.timeWindow = this.makeDefaultTimeWindowForUser()

    return this.userRepository.save(user)
  }

  private makeDefaultTimeWindowForUser() {
    const timeWindow = new TimeWindow()
    timeWindow.from = DEFAULT_TIME_WINDOW_START
    timeWindow.to = DEFAULT_TIME_WINDOW_END
    return timeWindow
  }
}
