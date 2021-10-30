import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../user/entities/user.entity'

@Entity()
export class DailySmokingReport {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column('int')
  public userId!: number

  @ManyToOne(() => User, (user) => user.timeWindow)
  @JoinColumn()
  public user!: User

  @Column()
  public amountOfSmokedCigarettes!: number

  @Column()
  public date!: Date

  public constructor(user: User, date: Date) {
    this.user = user
    this.date = date
    this.amountOfSmokedCigarettes = 0
  }
}
