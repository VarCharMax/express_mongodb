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
  this.password = await (async () => {
    return bcrypt.hash(this.password, 10);
  })();
});

const User = mongoose.model('User', UserSchema);
export default User;
