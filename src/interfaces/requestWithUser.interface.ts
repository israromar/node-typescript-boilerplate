import {Request} from 'express';
import IUser from './user.interface';
interface IRequestWithUser extends Request{
    user?:IUser
}
export default IRequestWithUser;