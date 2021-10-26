import { IsNumber, IsString } from 'class-validator'

export class FinishSignUpDTO {
  @IsString()
  public fcmToken!: string

  @IsNumber()
  public cigarettesPerDay!: number

  @IsNumber()
  public timezoneOffset!: number

  @IsString()
  public timeWindowStartTime!: string

  @IsString()
  public timeWindowEndTime!: string
}