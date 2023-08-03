const { User } = require( '../models/userModels.js' )
const jwt = require( 'jsonwebtoken' )
const bcryptjs = require( 'bcryptjs' )
const mongoose = require( 'mongoose' )
const signUp = async ( req, res ) => {
    try {
        const { userFirstName, userLastName, userEmail, userPhoneNumber, userPassword, userConfirmPassword, userGender } = req.body;
        if ( !userFirstName || !userLastName || !userEmail || !userGender ||
            !userPhoneNumber || !userPassword || !userConfirmPassword ) {
            throw new Error( "Please fill all the fields" );
        }
        if ( !userEmail.includes( '@gmail.com' ) ) throw new Error( "Please enter valid email" )
        if ( userEmail.length <= 10 ) throw new Error( "Please enter valid email" )
        const userExist = await User.findOne( { userEmail } );
        if ( userExist ) throw new Error( `User with ${ userEmail } already exists` );
        if ( userPassword !== userConfirmPassword ) throw new Error( "Password and confirm password not matching" );
        const salt = await bcryptjs.genSalt( parseInt( process.env.SALT_ROUNDS ) );
        const hashPassword = await bcryptjs.hash( userPassword, salt );
        const newUser = await User.create( {
            userFirstName,
            userLastName,
            userEmail,
            userPhoneNumber,
            userGender,
            userPassword: hashPassword
        } );
        if ( !newUser ) throw new Error( "Something went wrong" );
        const token = jwt.sign( { _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' } );
        if ( !token ) throw new Error( 'No token generated' );
        res.cookie( 'token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 } );
        res.status( 200 ).json( { user: newUser, token } );
        console.log( res.headers );

    } catch ( err ) {
        res.status( 400 ).json( { error: err.message } );
        console.log( err.message );
    }
};
const login = async ( req, res ) => {
    try {
        const { userEmail, userPassword } = req.body;
        if ( !userEmail || !userPassword ) throw new Error( "Please provide both userEmail & userPassword" );
        const reqUser = await User.findOne( { userEmail } );
        if ( !reqUser ) throw new Error( "User with this email does not exist" );
        const match = await bcryptjs.compare( userPassword, reqUser.userPassword );
        if ( !match ) throw new Error( "Incorrect password" );
        const token = jwt.sign( { _id: reqUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' } );
        if ( !token ) throw new Error( 'No token generated' );
        res.cookie( 'token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 } );
        res.status( 200 ).json( { user: reqUser, token } );
    } catch ( err ) {
        res.status( 400 ).json( { error: err.message } );
        console.log( err.message );
    }
};

const getProfile = async ( req, res ) => {
    try {
        const { _id } = req.params
        if ( !mongoose.Types.ObjectId.isValid( _id ) ) throw Error( "Invalid User Id" )
        const user = await User.findById( { _id } )
        if ( !user ) throw Error( "User Not found" )
        res.status( 200 ).json( user )
    }
    catch ( err ) {
        res.status( 400 ).json( err.message )
    }
}
const updateProfile = async ( req, res ) => {
    try {
        const { _id } = req.params
        if ( !mongoose.Types.ObjectId.isValid( _id ) ) throw Error( "Invalid User Id" )
        const profile = await User.findById( { _id } )
        if ( !profile ) throw Error( "No profile found" )
        const updateProfile = await User.findOneAndUpdate( { _id }, { ...req.body }, { new: true } )
        if ( !updateProfile ) throw Error( "Updation is not done" )
        res.status( 200 ).json( updateProfile )
    }
    catch ( err ) {
        res.status( 400 ).json( err.message )
    }
}
module.exports = { signUp, login, getProfile, updateProfile }