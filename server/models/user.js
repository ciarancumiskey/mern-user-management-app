const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        surname: {
            type: String,
            required: true,
            trim: true
        },
        user_email: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
                    throw new Error('Please enter a correctly-formatted email address.');
                }
            }
        },
        user_password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);
const User = mongoose.model('User', userSchema);

module.exports = User;