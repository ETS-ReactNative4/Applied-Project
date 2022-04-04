const express = require('express');
const router = express.Router();
const { Allergens } = require("../models/Allergens");

router.post("/", (req, res) => {

    Allergens.find({ 'userFrom': req.body.userFrom })
        .exec((err, allergens) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, allergens })
        })

});



module.exports = router;