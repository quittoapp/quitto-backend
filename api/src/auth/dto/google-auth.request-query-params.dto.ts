import { IsString } from 'class-validator'

export class GoogleAuthRequestQueryParamsDTO {
  @IsString()
  public idToken!: string
}
