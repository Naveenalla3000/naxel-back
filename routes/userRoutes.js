const express = require( 'express' );
const router = express.Router();
const { login, signUp, getProfile, updateProfile } = require( '../controllers/userControllers.js' )
const { requestAuth } = require( '../middleware/auth.js' )
router.post( '/login', login )
router.post( '/register', signUp )
router.get( '/:_id', requestAuth, getProfile )
router.patch( '/:_id', requestAuth, updateProfile )
module.exports = router;
