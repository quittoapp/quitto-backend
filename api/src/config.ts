import { IsNumber, IsString, validate } from "class-validator"

class Config {
  @IsString()
  public databaseHost: string = process.env.DATABASE_URL

  @IsNumber()
  public databasePort: number = Number(process.env.DATABASE_PORT)

  @IsString()
  public databaseUserName: string = process.env.DATABASE_USER_NAME

  @IsString()
  public databasePassword: string = process.env.DATABASE_PASSWORD

  @IsString()
  public databaseName: string = process.env.DATABASE_NAME
}

const config = new Config()
validate(config)

export { config }
