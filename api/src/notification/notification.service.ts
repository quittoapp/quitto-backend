/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'

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
      const firebaseServiceAccount = require('../../firebase-service-account.json')
      admin.initializeApp({ credential: admin.credential.cert(<any>firebaseServiceAccount) })
      isAppInitialized = true
    }
  }
}
