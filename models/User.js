import bcrypt from 'bcrypt';
import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
});

UserSchema.pre('save', async function () {
  //This is to avoid an issue where the hashed password wasn't getting saved.
  //By wrapping in an IIFE, we can use await with the bcrypt.hash function.
  this.password = await (async () => {
    return bcrypt.hash(this.password, 10);
  })();
});

const User = mongoose.model('User', UserSchema);
export default User;
