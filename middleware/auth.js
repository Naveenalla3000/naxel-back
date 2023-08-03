const Jwt = require( 'jsonwebtoken' );
const { User } = require( '../models/userModels.js' );

const requestAuth = async ( req, res, next ) => {
    const { authorization } = req.headers;
    if ( !authorization ) {
        return res.status( 401 ).json( { error: "Authorization token required" } );
    }
    const token = authorization.split( ' ' )[ 1 ];
    try {
        const { _id } = Jwt.verify( token, process.env.JWT_SECRET );
        req.user = await User.findById( { _id } )
        next();
    } catch ( err ) {
        console.error( err.message );
        res.status( 401 ).json( { error: "Not Authorized naveen" } );
    }
};

module.exports = { requestAuth };
