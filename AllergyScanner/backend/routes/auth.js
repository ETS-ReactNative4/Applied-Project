const express = require("express");
const router = express.Router();
// mongoose user model
const User = require('../models/User')
// for hashing password
const bcrypt = require("bcryptjs");

// Sign Up
router.post('/signup', (req,res) => {
    let { name, email, password } = req.body;
    
    // removes whitespace
    name = name.trim();
    email = email.trim();
    password = password.trim();
    
    // checks to see if variables are empty
    if(name == "" || email == "" || password == ""){
        // returns a json object
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
        // check the format of name using regular expression
    } else if (!/^[a-zA-Z]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        });
        // check the format of email using regular expression
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        });
       // checks the length of password 
    } else if (password.length < 7){
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        });
    } else {
        // checks if user already exists 
        User.find({email}).then(result => {
            if(result.length){
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



module.exports = router;