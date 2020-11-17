import {Schema,model,Document} from 'mongoose';
import IUser from '../interfaces/user.interface';

const userSchema = new Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
  }
});

const userModel = model<IUser & Document>('User',userSchema);

export default userModel;