import {NextFunction, Response, Router} from 'express';
import HttpException from '../errors/HttpException';
import IController from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import User from '../models/user.model';

class UserController implements IController {
    path='/user'

    router = Router()

    constructor () {
      this.initializeRoutes()
    }

    private initializeRoutes () {
      this.router.get(`${this.path}/:id`,this.getUserById)
    }

    private async getUserById (req:RequestWithUser,res:Response,next:NextFunction):Promise<void> {
      const id = req.params.id;

      try {
        const user= await User.findById(id);

        if(!user) next(new HttpException(404,'User not found'))
        else
          res.status(200).json({success:true,user})
      } catch (error) {
        next(new HttpException(500,error.message))
      }
    }
}
export default UserController;