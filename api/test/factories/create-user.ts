import { TimeWindow } from 'src/user/entities/time-window.entity'
import { User } from 'src/user/entities/user.entity'

export function createFakeUser(overrides: Partial<User> = {}) {
  const fakeTimeWindow = overrides.timeWindow ?? new TimeWindow('08:00', '23:00')

  const fakeUser = {
    email: 'test@email.com',
    fullName: 'Vasily Poopkin',
    photoUrl: 'http://example.com',
    hasFinishedRegistration: true,
    fcmToken: 'some test token',
    cigarettesPerDay: 15,
    timezoneOffset: 3,
    timeWindow: fakeTimeWindow,
    smokingPermissions: [],
    dailySmokingReport: [],
    ...overrides,
  } as User

  fakeTimeWindow.user = fakeUser

  return fakeUser
}
