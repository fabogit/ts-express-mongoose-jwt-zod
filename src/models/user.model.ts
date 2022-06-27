import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import config from 'config';

export interface UserDocument extends mongoose.Document{
	email: string;
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(inputPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
},{
	timestamps: true
});

// // If need to type next Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
// export interface HookNextFunction {
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	(error?: Error): any
// }

// pre hook to update and hash password
userSchema.pre('save', async function(next) {
	// alias for this
	const user = this as UserDocument;
	if(!user.isModified('password')){
		return next();
	}

	const salt = await bcrypt.genSalt(config.get('saltWorkFactor') as number);
	const hash = bcrypt.hashSync(user.password, salt);
	user.password = hash;
	return next();
});

userSchema.methods.comparePassword = async function(inputPassword: string): Promise<boolean> {
	const user = this as UserDocument;
	return await bcrypt.compare(inputPassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;