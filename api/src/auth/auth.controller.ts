import { Controller, Post, Query } from '@nestjs/common'
import { GoogleAuthRequestQueryParamsDTO } from './dto/google-auth.request-query-params.dto'
import { GoogleAuthService } from './google-auth.service'

@Controller('auth')
export class AuthController {
  public constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post('google')
  public authenticate(@Query() query: GoogleAuthRequestQueryParamsDTO) {
    return this.googleAuthService.authenticate(query.idToken)
  }
}
