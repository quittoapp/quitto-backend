import { IsEmail } from 'class-validator'

export class UserFromGoogle {
  @IsEmail()
  public email!: string
}
