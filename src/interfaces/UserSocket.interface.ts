import User from '../entities/user.entity';

export interface UserSocket extends User{
    socketId:string;
}