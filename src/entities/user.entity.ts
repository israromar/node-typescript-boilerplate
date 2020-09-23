import {Entity,Column,PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import AddressEntity from './address.entity';
@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id?:number;

    @Column()
    public email!:string;

    @Column()
    public password?:string;

    @Column()
    public name!:string;

    @OneToOne(()=>AddressEntity,(address:AddressEntity)=>address.user,{cascade:true})
    @JoinColumn()
    public address!:AddressEntity
}
export default User;