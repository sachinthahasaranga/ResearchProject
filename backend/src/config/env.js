import dotenv from 'dotenv';
dotenv.config();

export default {
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/inventoryDB',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    PORT: process.env.PORT || 5000
};
