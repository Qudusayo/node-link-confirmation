const mysql = require('mysql');

const user = require('./user');

// Create SQL connection
const db = mysql.createConnection({
    host: user.host,
    user: user.user,
    password: user.password,
    database: 'node-link-confirmation'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('MySql Connected Suucessfully ....')
})

const dbQuery = {
    pendUser: function (info) {
        let sql = `SELECT * FROM pending WHERE email = '${info.email}'`;
        console.log(info)
        db.query(sql, info, (err, result) => {
            if (err) throw err;
            else if (result.length > 0) {
                let query1 = `UPDATE pending SET route = '${info.route}' WHERE email = '${info.email}'`;
                db.query(query1, info, (err, result) => {
                    if (err) throw err;
                    console.log({ 'statusCode': 200, 'message': 'User Updated' });
                });
            } else {
                let query2 = 'INSERT INTO pending SET ?';
                db.query(query2, info, (err, result) => {
                    if (err) throw err;
                    console.log({ 'statusCode': 200, 'message': 'User Pending' });
                });
            }
        });
    },

    addUser: function (route) {
        let sql = `SELECT * FROM pending WHERE route = '${route}' LIMIT 1`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                let data;
                result.map(res => {
                    data = { ...res }
                });
                let query1 = `INSERT INTO users SET email = '${data.email}'`;
                let query = db.query(query1, (err, result) => {
                    if (err) throw err;
                    let query2 = `DELETE FROM pending WHERE route = '${data.route}'`;
                    let query = db.query(query2, (err, result) => {
                        if (err) throw err;
                        console.log('User Verified And Added')
                    })
                })
                console.log(data)
            }
        })
    }
}
module.exports = dbQuery;