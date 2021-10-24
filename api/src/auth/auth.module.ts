import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { config } from 'src/config'
import { GoogleAuthService } from './google-auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Module({
  imports: [UserModule, JwtModule.register({ secret: config.jwtSecretKey })],
  providers: [GoogleAuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
