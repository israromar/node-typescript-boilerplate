import {Response, Router} from 'express';
import IController from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import UserEntity from '../entities/user.entity';
import ChatService from '../services/chat';
import Chat from '../entities/chat.entity';
import Message from '../entities/message.entity';
import User from '../entities/user.entity';
class ChatController implements IController {

    router = Router();

    path = '/chat';

    constructor () {
      this.initializeRoutes();
    }

    private initializeRoutes ():void {
      this.router.get(`${this.path}`, authenticationMiddleware, this.getUserChats)
      this.router.post(`${this.path}`, authenticationMiddleware, this.startChat)
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