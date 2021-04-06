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
module.exports = router;