import {Response, Router} from 'express';
import IController from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import MessageService from '../services/message';
import Chat from '../entities/chat.entity';
import Message from '../entities/message.entity';
import {getRepository} from 'typeorm';
import User from '../entities/user.entity';
class MessageController implements IController {

    router = Router();

    path = '/message';

    constructor () {
      this.initializeRoutes();
    }

    private initializeRoutes ():void {
      this.router.post(`${this.path}`, authenticationMiddleware, this.saveChat)
    }

    /**
     * 
     * @body req:RequestWithUser chatId:Number, content:String
     * @middleware Authentication
     */
    private async saveChat (req:RequestWithUser, res:Response) {
      try {
        const userId = req.user?.id;
        const {chatId, content} = req.body;
        const chat:Chat = await getRepository<Chat>(Chat).findOneOrFail(chatId);
        const user:User = await getRepository<User>(User).findOneOrFail(userId);
        const message:Message = await MessageService.saveMessage(content, chat, user)

        message.chat = undefined;
        return res.status(200).json({success:true, message:'Message saved successfully', data:message})
      } catch (error) {
        res.status(500).json({success:false, message:error.message})
      }
    }
    

}
export default MessageController;