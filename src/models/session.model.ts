import mongoose from 'mongoose';

import { UserDocument } from './user.model';

<<<<<<< HEAD
<<<<<<< HEAD
export interface SchemaDocument extends mongoose.Document {
=======
export interface SessionDocument extends mongoose.Document {
>>>>>>> session
=======
export interface SessionDocument extends mongoose.Document {
>>>>>>> main
	user: UserDocument['_id'];
	valid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}

const sessionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
<<<<<<< HEAD
		ref: 'User',
=======
		ref: 'User'
>>>>>>> session
=======
		ref: 'User'
>>>>>>> main
	},
	valid: {
		type: Boolean,
		default: true
	},
	userAgent: {
		type: String
	}
<<<<<<< HEAD
<<<<<<< HEAD
},{
	timestamps: true
});

const SessionModel = mongoose.model('Session', sessionSchema);
=======
=======
>>>>>>> main
}, {
	timestamps: true
});

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);
<<<<<<< HEAD
>>>>>>> session
=======
>>>>>>> main

export default SessionModel;