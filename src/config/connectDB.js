import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('dms', 'root', null, {
	host: process.env.HOST,
	dialect: 'mysql'
});

export const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection established successfully');
	} catch (err) {
		console.log(err);
	}
};
