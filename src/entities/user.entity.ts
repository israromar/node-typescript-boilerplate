import {Entity,Column,PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import ProfileEntity from './profile.entity';
@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id?:number;

    @Column()
    public email!:string;

    @Column()
    public firstName!:string;

    @Column()
    public lastName!:string;

    @Column()
    public password?:string;

    // @OneToOne(()=>AddressEntity,(address:AddressEntity)=>address.user,{cascade:true})
    // @JoinColumn()
    // public address!:AddressEntity

  @OneToOne(()=>ProfileEntity,(profile:ProfileEntity)=>profile.user,{cascade:true})
  @JoinColumn()
  public profile!:ProfileEntity
}
export default User;