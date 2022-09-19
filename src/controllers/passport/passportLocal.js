import passport from 'passport';
import passportLocal from 'passport-local';

import { findUserByEmail, comparePassword, findUserById } from '../../services/loginService';

let LocalStrategy = passportLocal.Strategy;

export const initPassportLocal = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},
			async (req, email, password, done) => {
				try {
					await findUserByEmail(email)
						.then(async (user) => {
							if (!user) return done(null, false, req.flash('errors', 'User not found'));

							let message = await comparePassword(password, user);

							if (message === true) {
								return done(null, user, null);
							} else {
								return done(null, false, req.flash('errors', message));
							}
						})
						.catch((error) => {
							return done(null, false, req.flash('errors', error));
						});
				} catch (err) {
					return done(null, false, req.flash('errors', err));
				}
			}
		)
	);
};

passport.serializeUser((user, done) => {
	return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	await findUserById(id)
		.then((user) => {
			return done(null, user);
		})
		.catch((err) => {
			return done(req.flash('errors', err), null);
		});
});
