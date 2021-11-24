const express = require("express");
const router = express.Router();
// for hashing password
const bcrypt = require("bcryptjs");
// method to allow authentication
const jwt = require("jsonwebtoken");
// server side validation
const { check, validationResult } = require("express-validator");

//Secret key stored on the server
var jwtSecret = "secrettoken";

// @route   POST /users
// @desc    Registering user
// @access  Public
router.post("/", [
    // Validations of what user enters
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter password with 6 or more characters").isLength({ min: 6 }),
],
    async (req, res) => {
        //Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // displays errors
            return res.status(400).json({ errors: errors.array() });
          
        }

        const { name, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });

            if (user) {
                res.status(400).json({ errors: [{ msg: "User already exists" }] });
               
            }
            // create new user
            user = new User({
                name,
                email,
                password,
            });

            //Encrypt Password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    })

    module.exports = router;