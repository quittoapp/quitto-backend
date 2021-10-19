import { IsEmail, IsString, IsUrl } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  public email!: string

  @IsString()
  public fullName!: string

  @IsUrl()
  public photoUrl!: string

  @IsUrl()
  public timezoneOffset!: number

  @IsString()
  public fcmToken!: string
}
