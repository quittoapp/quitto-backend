import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { UserFromGoogle } from './dto/user-from-google.dto'

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post('auth')
  public create(@Body() createUserDto?: UserFromGoogle) {
    return this.userService.findOneOrCreate(createUserDto)
  }
}
