const express = require('express')
const router = express.Router()
const { Product } = require('../models/Product')

// post request to add scanned products
router.post('/addProducts', (req, res) => {
  // Save the information about the product or user Id  inside collection
  const product = new Product(req.body)
  console.log(req.body)
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})
// post request that removes a product by productId
router.post('/removeProducts', (req, res) => {
  Product.findOneAndDelete({
    productId: req.body.productId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err })
    res.status(200).json({ success: true, doc })
  })
})
// post request that finds all scanned products
router.post('/getScannedProducts', (req, res) => {
  // userfrom to know which user
  Product.find({ userFrom: req.body.userFrom }).exec((err, products) => {
    if (err) return res.status(400).send(err)
    return res.status(200).json({ success: true, products })
  })
})
// post request to delete all scanned products
router.post('/delete', (req, res) => {
  Product.deleteMany({ userFrom: req.body.userFrom }).exec((err, products) => {
    if (err) return res.status(400).send(err)
    return res.status(200).json({ success: true, products })
  })
})

module.exports = router
