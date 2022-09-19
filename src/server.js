import express from 'express';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import passport from 'passport';

import { configViewEngine } from './config/viewEngine.js';
import { initAllWebRoutes } from './routes/web.js';
import { configSession } from './config/session.js';

const app = express();
dotenv.config();

configSession(app);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initAllWebRoutes(app);

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});
