import { validationResult } from 'express-validator';

import { createNewUser } from '../services/userService';
import { validateRegister } from '../validations/authValidation';

export const getHomePage = (req, res) => {
	res.render('homePage');
};

export const getNewUserPage = (req, res) => {
	res.render('createUsers');
};

export const createNewUserController = async (req, res) => {
	let user = req.body;
	await createNewUser(user);

	res.redirect('/');
};

export const getRegisterPage = (req, res) => {
	let form = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	};

	res.render('auth/register', {
		errors: req.flash('errors'),
		form: form
	});
};

export const getLoginPage = (req, res) => {
	return res.render('auth/login', {
		errors: req.flash('errors')
	});
};

export const registerUserController = async (req, res) => {
	let form = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	};

	let errorsArray = [];
	let validationError = validationResult(req);

	if (!validationError.isEmpty()) {
		let errors = Object.values(validationError.mapped());

		errors.forEach((item) => {
			errorsArray.push(item.msg);
		});

		req.flash('errors', errorsArray);

		return res.render('auth/register', {
			errors: req.flash('errors'),
			form: form
		});
	}

	try {
		let user = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword,
			createdAt: Date.now()
		};

		await createNewUser(user);

		res.redirect('/');
	} catch (err) {
		req.flash('errors', err.message);

		return res.render('auth/register', {
			errors: req.flash('errors'),
			form: form
		});
	}
};

export const getAdminPage = (req, res) => {
	res.render('users/main');
};

export const getAllUsers = (req, res) => {
	res.render('users/manageUsers');
};

export const getCreateUsers = (req, res) => {
	res.render('users/createUsers');
};
