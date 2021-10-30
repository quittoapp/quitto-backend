import { CurrentUTCDateWithoutTime } from 'src/time/current-utc-date-without-time'

describe('CurrentUtcDateWithoutTime', () => {
  it('returns current zero-utc-offset date with time = 00:00', () => {
    const date = new CurrentUTCDateWithoutTime().toDate()
    const actualDate = new Date()

    expect(date.getHours()).toBe(0)
    expect(date.getMinutes()).toBe(0)
    expect(date.getFullYear()).toBe(actualDate.getUTCFullYear())
    expect(date.getMonth()).toBe(actualDate.getUTCMonth())
    expect(date.getDate()).toBe(actualDate.getUTCDate())
  })
})
