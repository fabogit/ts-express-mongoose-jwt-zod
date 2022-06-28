<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> session
=======
>>>>>>> main
import { object, string } from 'zod';

export const createSessionSchema = object({
	body: object({
<<<<<<< HEAD
<<<<<<< HEAD
		email: string({
			required_error: 'Email is required',
		}),
		password: string({
			required_error: 'Password is required',
		}),
	}),
=======
=======
>>>>>>> main
		email: string({required_error: 'Email is required'})
			.email('Not a valid email'),
		password: string({required_error: 'Password is required'})
	})
<<<<<<< HEAD
>>>>>>> session
=======
>>>>>>> main
});