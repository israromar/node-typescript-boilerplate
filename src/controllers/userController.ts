import {NextFunction, Request, Response, Router} from 'express';
import IController from '../interfaces/controller.interface';
import UserEntity from '../entities/user.entity';
import {getRepository} from 'typeorm';
import UserNotFoundException from '../errors/UserNotFoundException';

class UserController implements IController {
    path='/user';

    router = Router();

    constructor () {
      this.initializeRoutes();
    }

    private initializeRoutes ():void{
      this.router.get(`${this.path}/:id`,this.getUserById)
    }

    private async getUserById (req:Request,res:Response,next:NextFunction) {
      const {id} = req.params;

      try {
        const user = await getRepository<UserEntity>(UserEntity).findOne(id);
          
        if(user) {
          user.password = undefined;
          res.status(200).json({success:true,user});
        }
        else next(new UserNotFoundException());
      } catch (error) {
        next(new UserNotFoundException())
      }
    }

}
export default UserController;