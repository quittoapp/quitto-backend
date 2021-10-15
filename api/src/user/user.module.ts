import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { TimeWindow } from './entities/time-window.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, TimeWindow])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
