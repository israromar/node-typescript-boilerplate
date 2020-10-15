import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import ProfileEntity from './profile.entity';
import TaskEntity from './task.entity';
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public email!: string;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public password?: string;

  @Column()
  public account_created!: string;

  // @OneToOne(()=>AddressEntity,(address:AddressEntity)=>address.user,{cascade:true})
  // @JoinColumn()
  // public address!:AddressEntity

  @OneToOne(() => ProfileEntity, (profile: ProfileEntity) => profile.user, {
    cascade: true,
  })
  @JoinColumn()
  public profile!: ProfileEntity;

  @ManyToOne(() => TaskEntity, (task) => task.assignedTo)
  public task: TaskEntity;
}
export default User;
