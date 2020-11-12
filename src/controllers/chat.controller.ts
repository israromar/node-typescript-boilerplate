import {NextFunction, Response, Router} from 'express';
import IController from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import ChatService from '../services/chat';
import Chat from '../entities/chat.entity';
import Message from '../entities/message.entity';
class ChatController implements IController {

    router = Router();

    path = '/chat';

    constructor () {
      this.initializeRoutes();
    }

    private initializeRoutes ():void {
      this.router.get(`${this.path}`, authenticationMiddleware, this.getUserChats)
      this.router.post(`${this.path}`, authenticationMiddleware, this.startChat)
      this.router.get(`${this.path}/with/:id`, authenticationMiddleware, this.getUserChat)
    }

    private async getUserChats (req:RequestWithUser, res:Response) {
      const userId = req.user?.id;

      try {
        
        const chats = await ChatService.getUserChats(userId);
        const messagePromises:Array<Promise<Message[]>> = [];

        chats.forEach((chat:Chat)=>messagePromises.push(ChatService.getChatMessages(chat.id)));

        const messagePromise = await Promise.all(messagePromises);

        messagePromise.forEach((message, index)=>chats[index].messages = message)
        return res.status(200).json({success:true, message:'Chat retrieved successfully', chats})
        
      } catch (error) {
        return res.status(500).json({success:false, message:error.message})
      }

    }

    private async getUserChat (req:RequestWithUser, res:Response, next:NextFunction) {
      const userAId = req.user?.id
      const userBId = parseInt(req.params.id);

      try {
        const chats:Chat[] = await ChatService.getUserChatWith();
        let chat:Chat | null = null;

        chats.forEach(c=>{
          if(c.users.every(user=>[userAId, userBId].includes(user.id))) chat = c;
        })
        if(chat) {
          return res.status(200).json({success:true, message:'Chat retrieved successfully', chat})
        }
        else next(new Error('No chats associated with the user'))
        
      } catch (error) {
        return res.status(500).json({success:false, message:error.message})
      }

    }

    private async startChat (req:RequestWithUser, res:Response) {
      try {
        const userAId = req.user?.id;
        const {userBId} = req.body;
        const chat:Chat = await ChatService.createChat(userAId, userBId)

        return res.status(200).json({success:true, message:'Chat created successfully', chat})
      } catch (error) {
        return res.status(500).json({success:false, message:error.message})
      }
    }

}
export default ChatController;