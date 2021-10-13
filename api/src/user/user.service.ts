import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserFromGoogle } from './dto/user-from-google.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public findOneOrCreate(createUserDto: UserFromGoogle) {}
}
