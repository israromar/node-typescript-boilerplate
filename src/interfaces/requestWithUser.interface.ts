import {Request} from 'express';
// import IUser from './user.interface';
import UserEntity from '../entities/user.entity';
interface IRequestWithUser extends Request{
    user?:UserEntity
}
export default IRequestWithUser;