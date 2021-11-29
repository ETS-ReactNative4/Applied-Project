const express = require("express");
const router = express.Router();
// mongoose user model
const User = require('../models/User')
// for hashing password
const bcrypt = require("bcryptjs");

// Sign Up
router.post('/signup', (req, res) => {
    let { name, email, password } = req.body;

    // removes whitespace
    name = name.trim();
    email = email.trim();
    password = password.trim();

    // checks to see if variables are empty
    if (name == "" || email == "" || password == "") {
        // returns a json object
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
        // check the format of name using regular expression
    } else if (!/^[a-zA-Z]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        });
        // check the format of email using regular expression
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        });
        // checks the length of password 
    } else if (password.length < 7) {
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        });
    } else {
        // checks if user already exists 
        User.find({ email }).then(result => {
            if (result.length) {
                // a user already exists
                res.json({
                    status: "FAILED",
                    message: "User with the provided email already exists!"
                });
            } else {
                // try to create new user 
                // password handling
                const saltRounds = 10;
                // returns a promise with hashed password
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    // create new user
                    const newUser = new User({
                        name, email, password: hashedPassword
                    });
                    // saves the user
                    newUser.save().then(result => {
                        // returns a successful message
                        res.json({
                            status: "SUCCESS",
                            message: "Sign Up successful!",
                            data: result,
                        });
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while saving user"
                        });
                    })
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while hashing password"
                    });
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user!"
            });
        })
    }

})

// Sign In
router.post('/signin', (req, res) => {
    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();
    // check for empty variables
    if (email == "" || password == "") {
        // if empty, returns a message
        res.json({
            status: "FAILED",
            message: "Credentials are empty!"
        });
    } else {
        // check if user exists
        User.find({ email })
            .then(data => {
                if (data.length) {
                    // user exists
                    const hashedPassword = data[0].password
                    bcrypt.compare(password, hashedPassword).then(result => {
                        if (result) {
                            // password match
                            res.json({
                                status: "SUCCESS",
                                message: "Sign In successful",
                                data: data,
                            });
                        } else {
                            res.json({
                                status: "FAILED",
                                message: "Invalid password entered!"
                            });
                        }
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while comparing passwords!"
                        });
                    })
                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid credentials"
                    });
                }

            }).catch(err => {
                res.json({
                    status: "FAILED",
                    message: "An error occurred while checking user!"
                });
            })
    }

})

module.exports = router;