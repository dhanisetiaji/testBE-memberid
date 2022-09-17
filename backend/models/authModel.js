const db = require('../helpers/db')

module.exports = {
    login: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT userId, email FROM users WHERE email='${email}'`, (error, result) => {
                if (error) return reject({
                    success: false,
                    message: error.sqlMessage,
                })
                return resolve(result)
            })
        })
    },
}