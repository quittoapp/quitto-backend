import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { config } from 'src/config'
import { User } from 'src/user/entities/user.entity'
import { UserService } from 'src/user/user.service'

@Injectable()
export class GoogleAuthService {
  private googleOAuthClient = new OAuth2Client(
    config.googleOAuthClientId,
    config.googleOAuthClientSecret,
  )

  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async authenticate(googleAccessToken: string) {
    const ticket = await this.googleOAuthClient.verifyIdToken({
      idToken: googleAccessToken,
      audience: config.googleOAuthClientId,
    })

    const googleUser = ticket.getPayload()

    if (!googleUser) {
      throw new Error('No such google user')
    }

    const existingUser = await this.userService.getByEmail(googleUser.email as string)

    if (existingUser) {
      return this.makeToken(existingUser)
    }

    const newUser = this.makeUserFromGoogleUser(googleUser)
    await this.userService.create(newUser)

    return this.makeToken(newUser)
  }

  private makeUserFromGoogleUser(googleUser: TokenPayload) {
    const newUser = new User()
    newUser.email = googleUser.email!
    newUser.fullName = googleUser.name!
    newUser.photoUrl = googleUser.picture!
    newUser.timeWindow = this.userService.makeDefaultTimeWindowForUser(newUser)

    return newUser
  }

  private makeToken(user: User) {
    const payload = { username: user.fullName, sub: user.id }
    return this.jwtService.sign(payload)
  }
}
