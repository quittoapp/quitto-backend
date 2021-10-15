import { IsEmail, IsString, IsUrl } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  public email!: string

  @IsString()
  public fullName!: string

  @IsUrl()
  public photoUrl!: string

  @IsString()
  public fcmToken!: string
}
