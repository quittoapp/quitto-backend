import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'
import * as firebaseServiceAccount from '../../firebase-service-account.json'

let isAppInitialized = false

@Injectable()
export class NotificationService {
  public constructor() {
    this.initializeAppIfNecessary()
  }

  public async notify<T>(to: string | string[], data: T) {
    await admin.messaging().sendToDevice(to, data)
  }

  private initializeAppIfNecessary() {
    if (!isAppInitialized) {
      admin.initializeApp({ credential: admin.credential.cert(<any>firebaseServiceAccount) })
      isAppInitialized = true
    }
  }
}
