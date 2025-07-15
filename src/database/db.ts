import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a MySQL:', err);
            process.exit(1);
        } else {
            console.log('MySQL conectado');
        }
    });

    return connection;
};

export default connectDB;