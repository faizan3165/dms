import bcrypt from 'bcryptjs';

import db from '../models';

export const createNewUser = (user) => {
	return new Promise(async (resolve, reject) => {
		try {
			let validEmail = await validateUserEmail(user);

			if (validEmail) {
				reject({ value: 'This email already exists' });
			} else {
				const salt = bcrypt.genSaltSync(10);

				user.password = await bcrypt.hashSync(user.password, salt);

				await db.User.create(user);

				resolve({ value: 'Done' });
			}
		} catch (err) {
			reject(err);
		}
	});
};

const validateUserEmail = (user) => {
	return new Promise(async (resolve, reject) => {
		try {
			let currentUser = await db.User.findOne({
				where: {
					email: user.email
				}
			});

			if (currentUser) resolve({ value: true });
			resolve(false);
		} catch (error) {
			reject(error);
		}
	});
};
