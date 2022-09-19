import bcrypt from 'bcryptjs';

import db from '../models';

export const findUserByEmail = (emailInput) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: {
					email: emailInput
				}
			});

			if (!user) {
				reject(`No user with the email '${emailInput}' is found`);
			}
			resolve(user);
		} catch (error) {
			reject(error);
		}
	});
};

export const comparePassword = (password, userObject) => {
	return new Promise(async (resolve, reject) => {
		try {
			let isMatch = await bcrypt.compare(password, userObject.password);

			if (isMatch) {
				resolve(true);
			} else {
				resolve('Password is incorrect');
			}
		} catch (error) {
			reject(error.message);
		}
	});
};

export const findUserById = (idInput) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: {
					id: idInput
				}
			});

			if (!user) reject('User not found');

			resolve(user);
		} catch (error) {
			reject(error.message);
		}
	});
};
