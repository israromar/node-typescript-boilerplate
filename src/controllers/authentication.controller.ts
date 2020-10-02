import {NextFunction, Request, Response, Router} from 'express';
import {compare, hash} from 'bcrypt';
import {sign} from 'jsonwebtoken';
// Exceptions
import EmailAlreadyExistsException from '../errors/EmailAlreadyExistsException';
import InvalidCredentialsException from '../errors/InvalidCredentialsException';
// Interfaces
import IController from '../interfaces/controller.interface';
// import IUser from '../interfaces/user.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import IJwt from '../interfaces/jwt.interface';
import {getRepository} from 'typeorm';
import UserEntity from '../entities/user.entity';
// Models
class AuthenticationController implements IController {
    public path = '/auth'

    public router = Router();

    constructor () {
      this.initializeRoutes();
    }

    private initializeRoutes ():void{
      this.router.post(`${this.path}/register`,this.register);
      this.router.post(`${this.path}/login`,this.login);
      this.router.post(`${this.path}/logout`, this.loggingOut);
    }

    private register = async (req:Request,res:Response,next:NextFunction)=>{
      const userData:UserEntity = req.body;
      const newUser = getRepository<UserEntity>(UserEntity).create(userData);
      const userAlreadyExists = await getRepository<UserEntity>(UserEntity).findOne({email:userData.email})

      if(userAlreadyExists) {
        next(new EmailAlreadyExistsException(userData.email));
      }else{
        const hashedPassword = await hash(userData.password,10);

        newUser.password=hashedPassword;
        const user:UserEntity = await getRepository<UserEntity>(UserEntity).save(newUser);

        user.password = undefined;
        res.status(200).json({success:true,user});
      }
    }

    private login = async (req:Request,res:Response,next:NextFunction)=>{
      const userData:UserEntity = req.body;
      const user = await getRepository<UserEntity>(UserEntity).findOne({email:userData.email});

      if(user) {
        if(user.password) {
          const isPasswordSame = await compare(userData.password,user.password)

          if(isPasswordSame) {
            user.password = undefined;
            const tokenData:IJwt = this.createToken(user);

            // res.setHeader('Set-Cookie',[this.createCookie(tokenData)]);
            res.status(200).json({success:true,user,token:tokenData.token});
          }else next(new InvalidCredentialsException())
        }
      }else next(new InvalidCredentialsException())
    }

    private loggingOut = (request: Request, response: Response) => {
      response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
      response.send(200);
    }

    private createToken = (user:UserEntity):IJwt=>{
      const expiresIn = 60*60; // an hour
      const secret = process.env.SECRET;
      const dataStoredInToken:DataStoredInToken = {
        id:user.id
      }

      if(secret)
        return {
          expiresIn,
          token:sign(dataStoredInToken,secret,{expiresIn})
        }
      else throw new Error('Secret not provided');

    }

    private createCookie (tokenData: IJwt):string {
      return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}
export default AuthenticationController;