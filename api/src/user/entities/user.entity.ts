import { SmokingPermission } from 'src/smoking-permission/entities/smoking-permission.entity'
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToOne(() => TimeWindow)
  public timeWindow!: TimeWindow

  @OneToMany(() => SmokingPermission, (smokingPermission) => smokingPermission.user)
  public smokingPermissions!: SmokingPermission[]
}
