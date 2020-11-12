import {NextFunction, Request, Response, Router} from 'express';
import IController from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import UserEntity from '../entities/user.entity';
import ProfileEntity from '../entities/profile.entity';
import {getRepository} from 'typeorm';
import UserNotFoundException from '../errors/UserNotFoundException';
import ProfileNotFoundException from '../errors/ProfileNotFoundException';
import authenticationMiddleware from '../middlewares/authentication.middleware';

class ProfileController implements IController {
    path='/profile';

    router = Router();

    constructor () {
      this.initializeRoutes();
    }

    private initializeRoutes ():void {
      this.router.post(`${this.path}/create`, authenticationMiddleware, this.createUserProfile);
      this.router.get(`${this.path}/:name`, this.getUserProfileByName);
      this.router.patch(`${this.path}/`, authenticationMiddleware, this.updateUserProfile);
    }

    private async createUserProfile (req:RequestWithUser, res:Response, next:NextFunction) {
      const profileData:ProfileEntity = req.body;
      const id = req.user?.id;

      try {
          
        const user = await getRepository<UserEntity>(UserEntity).findOne({id});
    
        if(!user) next(new UserNotFoundException());
        else{
          const profile = getRepository<ProfileEntity>(ProfileEntity).create(profileData);

          await getRepository<ProfileEntity>(ProfileEntity).save(profile);
          await getRepository<UserEntity>(UserEntity).update(user, {profile});

          return res.status(200).json({success:true, profile, message:'Profile created'});
        }
      } catch (error) {
        return res.status(500).json({success:false, message:error.message});     
      }
    }

    private async getUserProfileByName (req:Request, res:Response, next:NextFunction) {
      const {name} = req.params;
      const fullName:string[] = name.split('-');

      try {
        const user = await getRepository<UserEntity>(UserEntity).findOne({firstName:fullName[0], lastName:fullName[1]}, {relations:['profile']});
          
        if(user) {
          user.password = undefined;
          res.status(200).json({success:true, profile:user.profile});
        }
        else next(new UserNotFoundException());
      } catch (error) {
        next(new UserNotFoundException())
      }
    }


    private async updateUserProfile (req:RequestWithUser, res:Response, next:NextFunction) {
      const profileData:ProfileEntity = req.body;
      const id = req.user?.id;

      try {
          
        const user = await getRepository<UserEntity>(UserEntity).findOne({id}, {relations:['profile']});
    
        if(!user) next(new UserNotFoundException());
        else{
          const profile = getRepository<ProfileEntity>(ProfileEntity).find({id:user.profile.id});

          if(!profile) next(new ProfileNotFoundException())

          await getRepository<ProfileEntity>(ProfileEntity).update({id:user.profile.id}, profileData);

          return res.status(200).json({success:true, profile:profileData, message:'Profile updated'});
        }
      } catch (error) {
        return res.status(500).json({success:false, message:error.message});     
      }
    }

}
export default ProfileController;