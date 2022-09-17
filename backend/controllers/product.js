const Product = require('../models/productModel')

module.exports = {
    getProduct: async (req, res) => {
        try {
            let point = req.query.point
            if (point) {
                point = point.split(',')
                if (point.length < 2) return res.status(404).json({ success: false, message: 'Error: Wrong point' })
            }
            let type = req.query.type
            if (type) {
                type = type.split(',')
                type = type.map(item => `'${item}'`)
                type = type.join(',')
            }
            let { limit, page } = req.query
            limit = Number(limit) || 5
            page = Number(page) || 1
            const offset = (page - 1) * limit
            const total = await Product.countAll()
            const totalPage = Math.ceil(total / limit)
            const result = await Product.getAll(limit, offset, point, type)
            const totalRows = result.length
            if (page > totalPage) {
                return res.status(404).json({ success: false, message: 'Error: Page not found!' })
            }
            return res.status(200).json({
                success: true,
                message: 'Success get product',
                data: {
                    total,
                    totalRows,
                    totalPage,
                    result
                }
            })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` })
        }
    },
    add: async (req, res) => {
        try {
            let setData = {
                ...req.body,
                imageProduct: req.file.path
            }
            console.log(setData)
            const result = await Product.add(setData);
            return res.status(200).json({ success: true, message: 'Success', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    update: async (req, res) => {
        try {
            const productId = req.params.productId;
            const checkData = await Product.getById(productId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${productId} not found!`, data: []
                })
            }
            let { imageProduct } = req.body;
            imageProduct = req.file ? req.file.path : checkData[0].imageProduct;
            let setData = {
                ...req.body,
                imageProduct
            }
            const result = await Product.update(productId, setData);
            return res.status(200).json({ success: true, message: 'Success update!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    remove: async (req, res) => {
        try {
            const productId = req.params.productId;
            const checkData = await Product.getById(productId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${productId} not found!`, data: []
                })
            }
            const result = await Product.remove(productId);
            return res.status(200).json({ success: true, message: 'Success delete!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    }
}