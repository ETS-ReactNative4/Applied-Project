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
        //console.log(req.body)

    })

});


router.post("/addFavourites", (req, res) => {

    // Save the information about the product or user Id  inside favorite collection 
    const favourite = new Favourite(req.body)
    console.log(req.body)
    favourite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
       
    })

});


router.post("/removeFavourites", (req, res) => {

    Favourite.findOneAndDelete({ productId: req.body.productId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
        })

});


router.post("/getFavouritedProduct", (req, res) => {

    Favourite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favourites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favourites })
        })

});




module.exports = router;