import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordReset: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//pre save middleware/ hook
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook we will save the data');
  const user = this;
  //hashing pass and save into db
  user.password = await bcrypt.hashSync(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post save middleware /hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log(this, 'this from post');

  next();
});

export const User = model<TUser>('User', userSchema);
