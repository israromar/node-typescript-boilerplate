import Message from '../entities/message.entity';
import Chat from '../entities/chat.entity'
import User from '../entities/user.entity';
import {getRepository} from 'typeorm';
export default class MessageService {
  public static async saveMessage (content:string, chat:Chat, user:User):Promise<Message> {
    const newMessage = new Message();

    newMessage.content = content;
    newMessage.from = user;
    newMessage.chat = chat;
    return await getRepository<Message>(Message).save(newMessage)
  }
}