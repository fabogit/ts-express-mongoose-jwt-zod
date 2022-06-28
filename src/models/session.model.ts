import mongoose from 'mongoose';

import { UserDocument } from './user.model';

<<<<<<< HEAD
export interface SchemaDocument extends mongoose.Document {
=======
export interface SessionDocument extends mongoose.Document {
>>>>>>> session
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
		ref: 'User',
=======
		ref: 'User'
>>>>>>> session
	},
	valid: {
		type: Boolean,
		default: true
	},
	userAgent: {
		type: String
	}
<<<<<<< HEAD
},{
	timestamps: true
});

const SessionModel = mongoose.model('Session', sessionSchema);
=======
}, {
	timestamps: true
});

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);
>>>>>>> session

export default SessionModel;