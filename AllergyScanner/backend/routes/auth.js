const express = require('express')
const router = express.Router()
// mongoose user model
const User = require('../models/User')
// for hashing password
const bcrypt = require('bcryptjs')

// Sign Up
router.post('/signup', (req, res) => {
  let { name, email, password } = req.body

  // removes whitespace
  name = name.trim()
  email = email.trim()
  password = password.trim()

  // checks to see if variables are empty
  if (name == '' || email == '' || password == '') {
    // returns a json object
    res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    })
    // check the format of name using regular expression
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid name entered',
    })
    // check the format of email using regular expression
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid email entered',
    })
    // checks the length of password
  } else if (password.length < 7) {
    res.json({
      status: 'FAILED',
      message: 'Password is too short!',
    })
  } else {
    // checks if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          // a user already exists
          res.json({
            status: 'FAILED',
            message: 'User with the provided email already exists!',
          })
        } else {
          // try to create new user
          // password handling
          const saltRounds = 10
          // returns a promise with hashed password
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              // create new user
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
              })
              // saves the user
              newUser
                .save()
                .then((result) => {
                  // returns a successful message
                  res.json({
                    status: 'SUCCESS',
                    message: 'Sign Up successful!',
                    data: result,
                  })
                })
                .catch((err) => {
                  res.json({
                    status: 'FAILED',
                    message: 'An error occurred while saving user',
                  })
                })
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occured while hashing password',
              })
            })
        }
      })
      .catch((err) => {
        console.log(err)
        res.json({
          status: 'FAILED',
          message: 'An error occurred while checking for existing user!',
        })
      })
  }
})

// Sign In
router.post('/signin', (req, res) => {
  let { email, password } = req.body

  email = email.trim()
  password = password.trim()
  // check for empty variables
  if (email == '' || password == '') {
    // if empty, returns a message
    res.json({
      status: 'FAILED',
      message: 'Credentials are empty!',
    })
  } else {
    // check if user exists
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // user exists
          const hashedPassword = data[0].password
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // password match
                res.json({
                  status: 'SUCCESS',
                  message: 'Sign In successful',
                  data: data,
                })
              } else {
                res.json({
                  status: 'FAILED',
                  message: 'Invalid password entered!',
                })
              }
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occurred while comparing passwords!',
              })
            })
        } else {
          res.json({
            status: 'FAILED',
            message: 'Invalid credentials',
          })
        }
      })
      .catch((err) => {
        res.json({
          status: 'FAILED',
          message: 'An error occurred while checking user!',
        })
      })
  }
})

router.get('/', (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).res.json(`Error: ${err}`))
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(`Error: ${err}`))
})

// updating users details
router.put('/update/:id', (req, res) => {
  let { name, email, password } = req.body

  // removes whitespace
  name = name.trim()
  email = email.trim()
  password = password.trim()

  // checks to see if variables are empty
  if (name == '' || email == '' || password == '') {
    // returns a json object
    res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    })
    // check the format of name using regular expression
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid name entered',
    })
    // check the format of email using regular expression
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid email entered',
    })
    // checks the length of password
  } else if (password.length < 7) {
    res.json({
      status: 'FAILED',
      message: 'Password is too short!',
    })
  } else {
    const opts = { runValidators: true }
    User.findById(req.params.id, { opts })
      .then((user) => {
        user.name = req.body.name
        user.email = req.body.email
        user.password = req.body.password
        // user.password = req.body.password
        //console.log(req.body)
        const saltRounds = 10
        bcrypt.hash(user.password, saltRounds).then((hashedPassword) => {
          user.password = hashedPassword
          user
            .save()
            .then((result) => {
            res.json({
                status: "SUCCESS",
                message: "Updated user successfully",
                data: result
            })})
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'Email already in use!',
              })
            })
        })
      })
      .catch((err) => res.status(400).json(`Error: ${err}`))
  }
})

module.exports = router
