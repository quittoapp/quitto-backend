import { TimeWindow } from 'src/user/entities/time-window.entity'
import { User } from 'src/user/entities/user.entity'
import faker from 'faker'

export function createFakeUser(overrides: Partial<User> = {}) {
  const fakeTimeWindow = overrides.timeWindow ?? new TimeWindow('08:00', '23:00')

  const fakeUser = {
    email: faker.internet.email(),
    fullName: faker.name.findName(),
    photoUrl: faker.internet.avatar(),
    hasFinishedRegistration: true,
    fcmToken: 'some test token',
    cigarettesPerDay: faker.datatype.number(20),
    timezoneOffset: faker.datatype.number({ min: -12, max: 12 }),
    timeWindow: fakeTimeWindow,
    smokingPermissions: [],
    dailySmokingReport: [],
    ...overrides,
  } as User

  fakeTimeWindow.user = fakeUser

  return fakeUser
}
