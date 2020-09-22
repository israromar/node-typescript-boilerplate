import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';
@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id?:number;

    @Column()
    public email!:string;

    @Column()
    public password!:string;

    @Column()
    public name!:string;
}
export default User;