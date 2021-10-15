import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'
import * as firebaseServiceAccount from '../../firebase-service-account.json'

admin.initializeApp({
  credential: admin.credential.cert(<any>firebaseServiceAccount),
})

// {
//   data: {
//     content: JSON.stringify({
//       id: 100,
//       channelKey: 'smoking_permissions',
//       title: 'Smoking permission!',
//       body: 'You can smoke now',
//       showWhen: true,
//       autoCancel: true,
//       privacy: 'Private',
//     }),
//     actionButtons: JSON.stringify([
//       {
//         key: 'SMOKE',
//         label: 'Smoke',
//         autoCancel: true,
//       },
//       {
//         key: 'SKIP',
//         label: 'Skip',
//         autoCancel: true,
//       },
//     ]),
//   },
// }

@Injectable()
export class NotificationService {
  public async sendNotification<T>(to: string, data: T) {
    await admin.messaging().sendToDevice(to, data)
  }
}
