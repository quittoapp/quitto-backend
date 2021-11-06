import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  public use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req

    res.on('close', () => {
      const { statusCode } = res

      this.logger.log(`${method} ${url} ${statusCode}`)
    })

    next()
  }
}
