import { Controller, Post, Query } from '@nestjs/common'
import { GoogleAuthQueryDTO } from './dto/google-auth-params.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post('auth/google')
  public authenticate(@Query() query: GoogleAuthQueryDTO) {
    return this.userService.authenticateWithGoogle(query.accessToken)
  }
}
