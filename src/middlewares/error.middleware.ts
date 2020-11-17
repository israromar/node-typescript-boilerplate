import {NextFunction, Request, Response} from 'express';
import HttpException from '../errors/HttpException';
function errorMiddleware (error:HttpException,req:Request,res:Response,next:NextFunction):void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  res.status(status).json({success:false,status,message});
  next();
}
export default errorMiddleware;