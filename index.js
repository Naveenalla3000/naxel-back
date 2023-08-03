const express = require( 'express' );
const dotenv = require( 'dotenv' ).config();
const PORT = process.env.PORT;
const { connDB } = require( './config/db.js' )
const cors = require( 'cors' )
const app = express();
const bodyParser = require( 'body-parser' )
app.use( cors() )
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )
connDB()
app.use( ( req, res, next ) => {
    console.log( `${ req.path }  ${ req.method }` )
    next()
} )
app.get( '/api/health', ( req, res ) => {
    res.status( 200 ).send( `health ok...` )
} )
const userRouters = require( './routes/userRoutes.js' );
app.use( '/api/users', userRouters );
const productRouters = require( './routes/productRoutes.js' )
app.use( '/api/products', productRouters )
const SPProductsRouters = require( './routes/spProducts.js' )
app.use( '/api/fav', SPProductsRouters )
const OrderRoutes = require( './routes/orderRoutes.js' )
app.use( '/api/orders', OrderRoutes )

const server = app.listen( PORT, () => {
    console.log( `server is running on port ${ PORT }` );
} );
