const db = require('../helpers/db')

module.exports = {
    countAll: (point, type) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT a.*,b.nameType FROM products a JOIN types b ON a.typeId = b.typeId ${type || point ? 'WHERE' : ''} ${type ? `b.nameType IN (${type})` : ''} ${type && point ? 'AND' : ''} ${point ? `a.poinProduct BETWEEN ${point[0]} AND ${point[1]}` : ''}`, (err, result) => {
                if (err) return reject({
                    success: false,
                    message: err.sqlMessage
                })
                return resolve(result.length)
            })
        })
    },
    getById: (productId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM products WHERE productId=${productId}`, (err, result) => {
                if (err) return reject({
                    success: false,
                    message: err.sqlMessage
                })
                return resolve(result)
            })
        })
    },
    getAll: (limit, offset, point, type) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT a.*,b.nameType FROM products a JOIN types b ON a.typeId = b.typeId ${type || point ? 'WHERE' : ''} ${type ? `b.nameType IN (${type})` : ''} ${type && point ? 'AND' : ''} ${point ? `a.poinProduct BETWEEN ${point[0]} AND ${point[1]}` : ''}  ORDER BY a.createdAt DESC LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
                if (err) return reject({
                    success: false,
                    message: err.sqlMessage
                })
                return resolve(res)
            })
        })
    },
    add: async (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO products SET ?`, data, (err, results) => {
                if (err) return reject({
                    success: false, message: err.sqlMessage
                })
                return resolve(results)
            })
        })
    },
    update: async (productId, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE products SET ? WHERE productId = ?`, [data, productId], (err, results) => {
                if (err) return reject({
                    success: false, message: err.sqlMessage
                })
                return resolve(results)
            })
        })
    },
    remove: async (productId) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM products WHERE productId = ?`, productId, (err, results) => {
                if (err) return reject({
                    success: false, message: err.sqlMessage
                })
                return resolve(results)
            })
        })
    }

}