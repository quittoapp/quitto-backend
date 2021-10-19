import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'
import * as firebaseServiceAccount from '../../firebase-service-account.json'

admin.initializeApp({
  credential: admin.credential.cert(<any>firebaseServiceAccount),
})

@Injectable()
export class NotificationService {
  public async notify<T>(to: string | string[], data: T) {
    await admin.messaging().sendToDevice(to, data)
  }
}
