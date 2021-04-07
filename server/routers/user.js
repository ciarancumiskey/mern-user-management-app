const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', async (request, result) => {
    //Get the email and password from the user's request
    const { user_email, user_password } = request.body;
    console.log('request.body', request.body);
    //Check if this user's email already has an account
    let user = await User.findOne({ user_email });
    if (user) {
        return result.status(400).send('An account already exists for this email.');
    }
    try {
        user = new User(request.body);
        user.user_password = await bcrypt.hash(user_password, 8);
        await user.save();
        result.status(201).send('Registration successful');
    } catch (e) {
        result.status(500).send('Registration failed. Please try again.');
    }
});

router.post('/login', async (request, result) => {
    try {
        //Check if an account exists
        const user = await User.findOne({ user_email: request.body.user_email });
        if (!user) {
            return result.status(400).send("Account not found for this email address.");
        }
        //Check if the user entered the correct password
        const isMatch = await bcrypt.compare(
            request.body.user_password, user.user_password
        );
        if (!isMatch) {
            return result.status(400).send("Incorrect email/password entered, please try again.");
        }
        //Remove the hashed password from the Object that will be sent back to the user
        const { user_password, ...rest } = user.toObject();
        return result.send(rest);
    } catch (error) {
        return result.status(500).send(error);
    }
});
module.exports = router;