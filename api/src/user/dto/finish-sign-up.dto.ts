import { IsMilitaryTime, IsNumber, IsString } from 'class-validator'

export class FinishSignUpDTO {
  @IsString()
  public fcmToken!: string

  @IsNumber()
  public cigarettesPerDay!: number

  @IsNumber()
  public timezoneOffset!: number

  @IsString()
  @IsMilitaryTime()
  public timeWindowStartTime!: string

  @IsString()
  @IsMilitaryTime()
  public timeWindowEndTime!: string
}
