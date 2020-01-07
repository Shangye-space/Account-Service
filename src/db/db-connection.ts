import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'host.docker.internal',
    port: 3309,
    user: 'root',
    password: 'root',
    database: 'db',
});
