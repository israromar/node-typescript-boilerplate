import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Chat from './chat.entity';
import UserEntity from './user.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public content:string

  @ManyToOne(()=>UserEntity)
  public from:UserEntity

  @Column({
    default:Date.now().toString()
  })
  public date?: string;

  @ManyToOne(()=>Chat, chat=>chat.messages)
  public chat:Chat
}
export default Message;
