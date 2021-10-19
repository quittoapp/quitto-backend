import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OAuth2Client } from 'google-auth-library'
import { config } from 'src/config'
import { Time } from 'src/time/time'
import { Repository } from 'typeorm'
import { TimeWindow } from './entities/time-window.entity'
import { User } from './entities/user.entity'

const DEFAULT_TIME_WINDOW_START = new Time(10, 0, 0).toString()
const DEFAULT_TIME_WINDOW_END = new Time(23, 55, 0).toString()

@Injectable()
export class UserService {
  private googleOAuthClient = new OAuth2Client(
    config.googleOAuthClientId,
    config.googleOAuthClientSecret,
  )

  public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async authenticateWithGoogle(googleAccessToken: string) {
    const ticket = await this.googleOAuthClient.verifyIdToken({
      idToken: googleAccessToken,
      audience: config.googleOAuthClientId,
    })
    const userInfo = ticket.getPayload()

    if (!userInfo) {
      throw new InternalServerErrorException(
        'No user info from google auth provider for some reason',
      )
    }

    if (await this.userExists(userInfo.email!)) {
      return this.userRepository.findOne({ email: userInfo.email })
    }

    const newUser = new User()
    newUser.email = userInfo.email!
    newUser.fullName = userInfo.name!
    newUser.photoUrl = userInfo.picture!
    newUser.timeWindow = this.makeDefaultTimeWindowForUser()

    await this.userRepository.save(newUser)

    return newUser
  }

  private makeDefaultTimeWindowForUser() {
    const timeWindow = new TimeWindow()
    timeWindow.from = DEFAULT_TIME_WINDOW_START
    timeWindow.to = DEFAULT_TIME_WINDOW_END
    return timeWindow
  }

  private userExists(email: string) {
    return this.userRepository.findOne({ email }).then(Boolean)
  }
}
