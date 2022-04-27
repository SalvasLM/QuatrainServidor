var pg = require('pg');

const connectionString = "postgres://awjgjzpajpsdib:b5c761f53e3d7e5583e3632f22b410550fc09099871af5d567808383e9a71c4d@ec2-99-80-170-190.eu-west-1.compute.amazonaws.com:5432/d7jubh4ukb3goe\n"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
})

module.exports = pool;