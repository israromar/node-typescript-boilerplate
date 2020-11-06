import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Message from './message.entity';
import User from './user.entity';

@Entity()
class Chat {
  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToMany(() => Message, message=>message.chat)
  public messages: Message[];


  @ManyToMany(()=>User, user=>user.chats)
  @JoinTable()
  public users:User[]

  @Column({
    default:Date.now().toString()
  })
  public created_at:string;
}
export default Chat;
