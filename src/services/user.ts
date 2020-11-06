import {getRepository} from 'typeorm';
import UserEntity from '../entities/user.entity';
class UserService {
  public static async getUserById (id:number | undefined):Promise<UserEntity> {
    const user:UserEntity = await getRepository<UserEntity>(UserEntity).findOneOrFail(id);

    return user;
  }
}
export default UserService;