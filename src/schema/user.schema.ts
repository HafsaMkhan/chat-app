import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, minLength: 8 },
  resetPassword: { type: String },
}, { timestamps: true });

export interface UserInterface {
	name: string;
	email: string;
	password?: string;
	resetPassword?: string;
}

UserSchema.pre<UserInterface>('save', async function (next) {
	const user = this;
	if(user.password) user.password = await bcrypt.hash(user.password, 10);
});

UserSchema.pre<UserInterface>('updateOne', async function (next) {
	if(this.password) this.password = await bcrypt.hash(this.password, 10);
});


export const UserModel = model('Users', UserSchema)
