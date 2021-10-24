import { IsString } from 'class-validator'

export class GoogleAuthQueryDTO {
  @IsString()
  public accessToken!: string
}
