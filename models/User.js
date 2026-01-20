import bcrypt from 'bcrypt';
import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
});

UserSchema.pre('save', async function () {
  // let user = this;
  console.log(this.password);
  //This is to avoid an issue where the hashed password wasn't getting saved.
  this.password = await (async () => {
    return bcrypt.hash(this.password, 10);
  })();
});

const User = mongoose.model('User', UserSchema);
export default User;
