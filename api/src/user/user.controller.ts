import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FinishSignUpDTO } from './dto/finish-sign-up.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('signup/finish')
  public finishSigningUp(@Body() body: FinishSignUpDTO, @Request() req: any) {
    return this.userService.finishSignUp(req.user.id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  public updateUser(@Body() body: UpdateUserDTO, @Request() req: any) {
    return this.userService.updateUser(req.user.id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public getMe(@Request() req: any) {
    return req.user
  }
}
