import { Controller, Post, Query } from '@nestjs/common'
import { GoogleAuthQueryDTO } from './dto/google-auth-params.dto'
import { GoogleAuthService } from './google-auth.service'

@Controller('auth')
export class AuthController {
  public constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post('google')
  public authenticate(@Query() query: GoogleAuthQueryDTO) {
    return this.googleAuthService.authenticate(query.idToken)
  }
}
