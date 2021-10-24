import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class SmokingPermission {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public date!: Date

  @ManyToOne(() => User, (user) => user.smokingPermissions)
  @JoinColumn()
  public user!: User

  public constructor(date: Date, user: User) {
    this.date = date
    this.user = user
  }
}
