import {NextFunction, Request, Response, Router} from 'express';
import IController from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import UserEntity from '../entities/user.entity';
import ProfileEntity from '../entities/profile.entity';
import {getRepository} from 'typeorm';
import UserNotFoundException from '../errors/UserNotFoundException';

class ProfileController implements IController {
    path='/profile';

    router = Router();

    constructor () {
      this.initializeRoutes();
    }

    private initializeRoutes ():void{
      this.router.post(`${this.path}/create`,this.createUserProfile);
      this.router.get(`${this.path}/user/:name`,this.getUserProfileByName)
    }

    private async createUserProfile (req:RequestWithUser,res:Response,next:NextFunction) {
      const profileData:ProfileEntity = req.body;
      const id = req.user?.id;

      try {
          
        const user = await getRepository<UserEntity>(UserEntity).findOne(id);
    
        if(!user) next(new UserNotFoundException());
        else{
          const profile = getRepository<ProfileEntity>(ProfileEntity).create(profileData);

          await getRepository<ProfileEntity>(ProfileEntity).save(profile);
          await getRepository<UserEntity>(UserEntity).update(user,{profile});

          return res.status(200).json({success:true,message:'Profile created'});
        }
      } catch (error) {
        return res.status(500).json({success:false,message:error.message});     
      }
    }

    private async getUserProfileByName (req:Request,res:Response,next:NextFunction) {
      const {name} = req.params;
      const firstName:string[] = name.split('-');

      try {
        const user = await getRepository<UserEntity>(UserEntity).findOne({firstName:firstName[0]},{relations:['profile']});
          
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
export default ProfileController;