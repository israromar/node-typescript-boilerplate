import {getRepository} from 'typeorm';
import ChatEntity from '../entities/chat.entity';
import Message from '../entities/message.entity';
import User from '../entities/user.entity';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserService from './user';

class ChatService {
  public static async createChat (userAId:number | undefined, userBId:number):Promise<ChatEntity> {
    const userA:User = await UserService.getUserById(userAId);
    const userB:User = await UserService.getUserById(userBId);

    if(!userA) throw new UserNotFoundException();
    if(!userB) throw new UserNotFoundException();

    /**
     * Check if the user already has initiated a
     * chat with the User or the other user has also done
     * the same
     */

    const chats:ChatEntity[] = await getRepository<ChatEntity>(ChatEntity).find({relations:['users']});
    let alreadyHasInitiatedChat = 0;

    chats.forEach(chat=>{
      chat.users.forEach(user=>{
        if(user.id === userA.id || user.id===userB.id) alreadyHasInitiatedChat++;
      })
    })
    if(alreadyHasInitiatedChat===2) throw new Error(`You have already initiated chat with user ${userB.firstName} ${userB.lastName}`)
    const users:User[] = [userA, userB];
    const chat = new ChatEntity();

    chat.users = users;
    await getRepository<ChatEntity>(ChatEntity).save(chat);

    return chat;
  }

  public static async getUserChats (id:number | undefined):Promise<ChatEntity[]> {
    const chats:ChatEntity[] = (await getRepository<User>(User).findOneOrFail(id, {relations:['chats']})).chats

    return chats;
  }

  public static async getChatMessages (id:number | undefined):Promise<Message[]> {
    const chat:ChatEntity = await getRepository<ChatEntity>(ChatEntity).findOneOrFail(id, {relations:['messages']});

    return chat.messages;
  }

}
export default ChatService;