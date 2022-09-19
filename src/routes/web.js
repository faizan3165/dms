import express from 'express';
import passport from 'passport';

import {
	getHomePage,
	getNewUserPage,
	createNewUserController,
	getRegisterPage,
	getLoginPage,
	registerUserController,
	getAdminPage,
	getAllUsers,
	getCreateUsers
} from '../controllers/homePage.js';

import { initPassportLocal } from '../controllers/passport/passportLocal.js';
import { validateRegister } from '../validations/authValidation.js';
import { checkLoggedIn, checkLoggedOut, postLogOut } from '../controllers/authController.js';

initPassportLocal();
const router = express.Router();

export const initAllWebRoutes = (app) => {
	router.get('/', getHomePage);
	router.get('/new-user', getNewUserPage);
	router.get('/register', getRegisterPage);
	router.get('/login', checkLoggedOut, getLoginPage);
	router.get('/logout', postLogOut);
	router.get('/users', checkLoggedIn, getAdminPage);
	router.get('/all-users', checkLoggedIn, getAllUsers);
	router.get('/create-users', checkLoggedIn, getCreateUsers);

	router.post('/register', validateRegister, registerUserController);
	router.post(
		'/login',
		passport.authenticate('local', {
			successRedirect: '/users',
			failureRedirect: '/login',
			successFlash: true,
			failureFlash: true
		})
	);
	router.post('/create-new-user', createNewUserController);

	return app.use('/', router);
};
