import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FinishSignUpDTO } from './dto/finish-sign-up.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('finish-signup')
  public finishSigningUp(@Body() body: FinishSignUpDTO, @Request() req: any) {
    return this.userService.finishSignUp(req.user.id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public getMe(@Request() req: any) {
    return req.user
  }
}
