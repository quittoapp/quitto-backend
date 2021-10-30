import { SmokingPermission } from 'src/smoking-permission/entities/smoking-permission.entity'
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { DailySmokingReport } from '../../daily-smoking-report/entities/daily-smoking-report.entity'
import { TimeWindow } from './time-window.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public email!: string

  @Column()
  public fullName!: string

  @Column()
  public photoUrl!: string

  @Column({ default: false })
  public hasFinishedRegistration!: boolean

  @Column({ nullable: true })
  public fcmToken!: string

  @Column({ nullable: true })
  public cigarettesPerDay!: number

  @Column({ type: 'integer', nullable: true })
  public timezoneOffset!: number

  @OneToOne(() => TimeWindow, (timeWindow) => timeWindow.user, { nullable: true, cascade: true })
  public timeWindow!: TimeWindow

  @OneToMany(() => SmokingPermission, (smokingPermission) => smokingPermission.user)
  public smokingPermissions!: SmokingPermission[]

  @OneToMany(() => DailySmokingReport, (report) => report.user, { cascade: true })
  public dailySmokingReport!: DailySmokingReport[]
}
