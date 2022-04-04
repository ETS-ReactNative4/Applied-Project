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

router.post("/addAllergens", (req, res) => {

    const allergen = new Allergens(req.body)
    console.log(req.body)
    allergen.save()
    .then((rese) => res.json(rese))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

router.post("/removeAll", (req, res) => {
    Allergens.deleteMany({ 'userFrom': req.body.userFrom })
        .exec((err, allergens) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, allergens })
        })

});



module.exports = router;
