import { Schema, mongoose } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);
export default User;
