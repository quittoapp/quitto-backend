import { noop } from 'lodash'

export class NotificationServiceStub {
  public async notify<T>(to: string | string[], data: T) {
    noop(to, data)
  }
}
