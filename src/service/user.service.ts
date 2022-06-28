<<<<<<< HEAD
<<<<<<< HEAD
import { DocumentDefinition } from 'mongoose';
=======
import { DocumentDefinition, FilterQuery } from 'mongoose';
>>>>>>> session
=======
import { DocumentDefinition, FilterQuery } from 'mongoose';
>>>>>>> main
import { omit } from 'lodash';

import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) {
	try {
		const user = await UserModel.create(input);
<<<<<<< HEAD
<<<<<<< HEAD
=======
		// instead _omit might use $project : {_id: 0 ,..., password: 0}
>>>>>>> session
=======
		// instead _omit might use $project : {_id: 0 ,..., password: 0}
>>>>>>> main
		return omit(user.toJSON(), 'password');
	} catch (err: any) {
		throw new Error(err);
	}
}

<<<<<<< HEAD
<<<<<<< HEAD
export async function validatePassword({email, password,}:{email: string; password: string;}) {
	const user = await UserModel.findOne({email});

	if(!user){
=======
=======
>>>>>>> main
export async function validatePassword({email, password,}: {email: string;	password: string;}) {
	const user = await UserModel.findOne({ email });

	if (!user) {
<<<<<<< HEAD
>>>>>>> session
=======
>>>>>>> main
		return false;
	}

	const isValid = await user.comparePassword(password);

<<<<<<< HEAD
<<<<<<< HEAD
	if(!isValid){
		return false;
	}
	return omit(user.toJSON(), 'password');
=======
=======
>>>>>>> main
	if (!isValid) return false;

	return omit(user.toJSON(), 'password');
}

export async function findUser(query:FilterQuery<UserDocument>) {
	return UserModel.findOne(query).lean();
<<<<<<< HEAD
>>>>>>> session
=======
>>>>>>> main
}