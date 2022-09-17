const jwt = require('jsonwebtoken');
const { login } = require('../models/authModel');

module.exports = {
    login: async (req, res) => {
        try {
            let { email, password } = req.body
            email = email.toLowerCase()
            if (!email) {
                return res.status(404).json({ success: false, message: "Error: Fields must be filled" })
            }
            const result = await login(email)
            if (result.length < 1) {
                return res.status(404).json({ success: false, message: 'Error: Wrong email address!' })
            }
            const token = jwt.sign({ userId: result[0].userId, email: result[0].email }, process.env.SECRET_KEY_JWT, {
                expiresIn: '1 day'
            })
            return res.status(200).json({
                success: true,
                message: 'Success login',
                data: {
                    token
                }
            })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` })
        }
    }
}