import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import UserEntity from './user.entity';
@Entity()
class Task {
  @PrimaryColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public isActive: boolean;

  @Column()
  public startTime: string;

  @Column()
  public deadline: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  public createdBy: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.task)
  public assignedTo: UserEntity[];
}
export default Task;
