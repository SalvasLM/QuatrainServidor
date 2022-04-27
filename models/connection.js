var pg = require('pg');

const connectionString = "postgres://iyeqnhvvsnprgg:f86a67e90666581f9bd1646c04dd1db2670ba109d7d353e11369a655eff3c457@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dchcla98v59dg0\n"
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