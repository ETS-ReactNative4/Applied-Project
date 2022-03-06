const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");

router.post("/addProducts", (req, res) => {

 Product.find({ "userFrom": req.body.userFrom, "productId":  req.body.productId  })
     .exec(( err, product) => {
         if(err) return res.status(400).send(err)
          console.log(product)
        
         
         if(!product.length) {
            const product = new Product(req.body)
            product.save((err, doc) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true })
               
            })
         }
        })

});

module.exports = router;