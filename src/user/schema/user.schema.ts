import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String,  required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'REGULAR' },
  isDeleted: { type: Boolean, default: false},
});
