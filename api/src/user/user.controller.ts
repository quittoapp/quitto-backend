import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FinishSignUpRequestBodyDTO } from './dto/finish-sign-up.request-body.dto'
import { UpdateUserRequestBodyDTO } from './dto/update-user.request-body.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('signup/finish')
  public finishSigningUp(@Body() body: FinishSignUpRequestBodyDTO, @Request() req: any) {
    return this.userService.finishSignUp(req.user.id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  public updateUser(@Body() body: UpdateUserRequestBodyDTO, @Request() req: any) {
    return this.userService.updateUser(req.user.id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public getMe(@Request() req: any) {
    return req.user
  }
}
