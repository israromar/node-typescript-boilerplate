import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import Chat from './chat.entity';
import ChatEntity from './chat.entity';
import MessageEntity from './message.entity';
import ProfileEntity from './profile.entity';
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public password?: string;

  @Column()
  public account_created?: string;

  @OneToOne(() => ProfileEntity, (profile: ProfileEntity) => profile.user, {
    cascade: true,
  })
  @JoinColumn()
  public profile: ProfileEntity;

  @ManyToMany(()=>ChatEntity, chat=>chat.users)
  public chats:ChatEntity[]

  @OneToMany(()=>MessageEntity, message=>message.from)
  public message:MessageEntity
}
export default User;
