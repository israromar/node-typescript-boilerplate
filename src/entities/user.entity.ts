import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';
// import AddressEntity from './address.entity';
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
}
export default User;