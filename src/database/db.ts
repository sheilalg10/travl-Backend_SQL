import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const connectDB = () => {
    const connect = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connect.connect((err) => {
        if (err) {
            console.error('Error al conectar a MySQL: ', err);
            process.exit(1);
        } else {
            console.log('MySQL conectado');
        }
    });

    return connect;
}

export default connectDB;