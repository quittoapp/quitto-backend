export class OffsetOfCurrentMidnightTimezone {
  public constructor(private readonly currentUTCHours = new Date().getUTCHours()) {}

  public toNumber() {
    if (this.currentUTCHours <= 12) {
      return -this.currentUTCHours
    }

    return 24 - this.currentUTCHours
  }
}
