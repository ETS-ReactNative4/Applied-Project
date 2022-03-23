const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
/*router.post("/addProducts", (req, res) => {

 Product.find({ "userFrom": req.body.userFrom, "productId":  req.body.productId  })
     .exec(( err, product) => {
         if(err) return res.status(400).send(err)
          console.log(product)
         //So we can know if I already favorite this product or not 
         
         if(!product.length) {
            const product = new Product(req.body)
            product.save((err, doc) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true })
               
            })
         }
        })

});*/

router.post("/addProducts", (req, res) => {

    // Save the information about the product or user Id  inside collection 
    const product = new Product(req.body)
    console.log(req.body)
    product.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
       
    })

});

router.post("/removeProducts", (req, res) => {

    Product.findOneAndDelete({ productId: req.body.productId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
        })

});

router.post("/getScannedProducts", (req, res) => {

    Product.find({ 'userFrom': req.body.userFrom })
        .exec((err, products) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, products })
        })

});

module.exports = router;