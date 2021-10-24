import { IsString } from 'class-validator'

export class GoogleAuthQueryDTO {
  @IsString()
  public idToken!: string
}
