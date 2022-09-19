import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import session from 'express-session';

dotenv.config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const myDatabase = new Sequelize('docmanagement', 'root', '', {
	host: process.env.HOST,
	logging: false,
	dialect: 'mysql',
	storage: './session.mysql'
});

const sessionStore = new SequelizeStore({
	db: myDatabase
});

export const configSession = (app) => {
	app.use(
		session({
			key: 'express.sid',
			secret: 'my secret',
			store: sessionStore,
			resave: true,
			saveUninitialized: false,
			cookie: {
				httpOnly: false,
				secure: false,
				maxAge: 24 * 60 * 60 * 1000
			}
		})
	);
};

sessionStore.sync();
