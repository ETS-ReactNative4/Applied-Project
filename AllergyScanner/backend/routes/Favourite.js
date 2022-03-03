const express = require('express');
const router = express.Router();
const { Favourite } = require("../models/Favourite");


router.post("/favourited", (req, res) => {
   
   // Find Favorite Information inside Favorite Collection by Product Id , userFrom 
   Favourite.find({"productId":  req.body.productId , "userFrom": req.body.userFrom })
    .exec(( err, favourite) => {
        if(err) return res.status(400).send(err)
          
        //So we can know if I already favorite this product or not 
        let result = false;
        if(favourite.length !== 0) {
            result = true
        }

        res.status(200).json({ success: true, favourited: result});
        console.log(req.body)

    })

});



module.exports = router;