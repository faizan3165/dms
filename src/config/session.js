import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import session from 'express-session';

dotenv.config();

let SequelizeStore = require('connect-session-sequelize')(session.Store);

let myDatabase = new Sequelize('docmanagement', 'root', '', {
	host: '127.0.0.1',
	logging: false,
	dialect: 'mysql',
	storage: './session.mysql'
});

let sessionStore = new SequelizeStore({
	db: myDatabase
});

export let configSession = (app) => {
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
