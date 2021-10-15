import { IsNumber, IsString, validate } from 'class-validator'
import * as dotenv from 'dotenv'

dotenv.config()

class Config {
  @IsNumber()
  public servicePort = Number(process.env.SERVICE_PORT)

  @IsString()
  public databaseHost: string = process.env.DATABASE_HOST as string

  @IsNumber()
  public databasePort = Number(process.env.DATABASE_PORT)

  @IsString()
  public databaseUserName: string = process.env.DATABASE_USER_NAME as string

  @IsString()
  public databasePassword: string = process.env.DATABASE_PASSWORD as string

  @IsString()
  public databaseName: string = process.env.DATABASE_NAME as string
}

const config = new Config()

validate(config).then((errors) => {
  if (errors.length) {
    console.log(errors.join('\n'))
    process.exit(1)
  }
})

export { config }
