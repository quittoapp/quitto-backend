import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDTO } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post('auth/google')
  public create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.findOneOrCreate(createUserDto)
  }
}
