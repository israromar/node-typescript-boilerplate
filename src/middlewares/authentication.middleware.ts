import {NextFunction, Response} from 'express';
import {verify} from 'jsonwebtoken'
import {getRepository} from 'typeorm';
import UserEntity from '../entities/user.entity';
import IRequestWithUser from '../interfaces/requestWithUser.interface';
import IDataStoredInToken from '../interfaces/dataStoredInToken.interface';
// import UserEntity from '../interfaces/user.interface';
import InvalildTokenException from '../errors/InvalidTokenException';
import AuthenticationTokenMissingException from '../errors/AuthenticationTokenMissingException';
export default async (req:IRequestWithUser,res:Response,next:NextFunction):Promise<IRequestWithUser>=>{
  const cookies = req.cookies;

  if(cookies && cookies.Authorization) {
    const secret = process.env.SECRET;

    if(secret)
      try {
        const verififactionResponse = verify(cookies.Authorization,secret) as IDataStoredInToken;
        const id = verififactionResponse.id;
        const user = await getRepository<UserEntity>(UserEntity).findOne({id});

        if(user) {
          req.user = user;
          next();
        }else {
          next(new InvalildTokenException());
        }
      } catch (error) {
        next(new InvalildTokenException());
      }
    else throw new Error('No secret provided from Auth middleware')
  }else{
    next(new AuthenticationTokenMissingException())
  }
  return req;
}