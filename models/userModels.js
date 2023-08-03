const mongoose = require( 'mongoose' );
const userSchema = new mongoose.Schema( {
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhoneNumber: { type: String, required: true },
    userPassword: { type: String, required: true },
    userGender: { type: String, required: true }
}, {
    timestamps: true
} );
const User = mongoose.model( 'User', userSchema );
module.exports = { User };
