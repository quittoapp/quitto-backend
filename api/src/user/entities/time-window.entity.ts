import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class TimeWindow {
  @OneToOne(() => User, (user) => user.timeWindow, { primary: true })
  @JoinColumn()
  public user!: User

  @Column({ type: 'time' })
  public from!: string

  @Column({ type: 'time' })
  public to!: string

  public constructor(from?: string, to?: string) {
    if (from) {
      this.from = from
    }

    if (to) {
      this.to = to
    }
  }

  public update({ from, to }: { from?: string; to?: string }) {
    if (from) {
      this.from = from
    }

    if (to) {
      this.to = to
    }
  }
}
