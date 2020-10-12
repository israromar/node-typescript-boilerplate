import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import UserEntity from './user.entity';

@Entity()
class Profile {
    @PrimaryGeneratedColumn()
    public id?:number;

    @Column()
    public profession!:string;

    @Column()
    public skills!:string;

    @OneToOne(()=>UserEntity,(user:UserEntity)=>user.profile)
    public user!:UserEntity;
}
export default Profile;