import { IsMilitaryTime, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateUserRequestBodyDTO {
  @IsOptional()
  @IsString()
  public fcmToken?: string

  @IsOptional()
  @IsNumber()
  public cigarettesPerDay?: number

  @IsOptional()
  @IsNumber()
  public timezoneOffset!: number

  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  public timeWindowStartTime!: string

  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  public timeWindowEndTime!: string
}
