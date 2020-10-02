import {PrimaryGeneratedColumn,Column, Entity} from 'typeorm';
// import UserEntity from './user.entity';
@Entity()
class Address {
    @PrimaryGeneratedColumn()
    public id?:string

    @Column()
    public street!:string

    @Column()
    public city!:string

    @Column()
    public country!:string

  // @OneToOne(()=>UserEntity,(user:UserEntity)=>user.address)
  // public user!:UserEntity
}
export default Address;