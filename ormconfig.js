require('dotenv').config();

module.exports = {
    name: 'default',
    type: 'postgres',
    host: '127.0.0.1',
    port: 54320,
    username: 'ideas',
    password: 'ideas',
    database: 'ideas',
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: ['dist/**/*.entity.js'],
}