const mongoose = require( 'mongoose' )
const { User } = require( '../models/userModels.js' )
const { Product } = require( '../models/productsModels.js' )
const { Orders } = require( '../models/orderModels.js' )
const createOrder = async ( req, res ) => {
    try {
        const { _uid, _pid } = req.params
        if ( !_uid ) throw new Error( "No _uid" );
        if ( !_pid ) throw new Error( "No _pid" )
        if ( !mongoose.Types.ObjectId.isValid( _uid ) ) throw Error( "No User avaiable" )
        const user = await User.findById( _uid )
        if ( !user ) throw new Error( "No user Found" )
        if ( !mongoose.Types.ObjectId.isValid( _pid ) ) throw Error( "No Product avaiable" )
        const product = await Product.findById( _pid )
        if ( !product ) throw new Error( "Product not found" )
        const { productName, productDescription, productRating, productOldPrice, productNewPrice, productDiscount, productImageUri } = product
        const order = await Orders.create( {
            user: _uid,
            product: _pid,
            productName,
            productDescription,
            productRating,
            productOldPrice,
            productNewPrice,
            productDiscount,
            productImageUri
        } );
        if ( !order ) throw new Error( "Order not placed" )
        res.status( 200 ).json( order )
    }
    catch ( err ) {
        console.log( err.message )
        res.status( 400 ).json( { error: err.message } )
    }
}

const getOrders = async ( req, res ) => {
    try {
        const { _uid } = req.params
        if ( !_uid ) throw new Error( "No _uid" );
        const user = await User.findById( _uid )
        if ( !user ) throw new Error( "No user Found" )
        const orders = ( await Orders.find( { user: _uid } ) ).reverse()
        if ( !orders ) throw new Error( "No orders found for this user" )
        if ( orders.length === 0 ) {
            return res.status( 400 ).json( { error: "Your orders are empty" } )
        }
        res.status( 200 ).json( orders );
    }
    catch ( err ) {
        console.log( err.message )
        res.status( 400 ).json( { error: err.message } );
    }
}
module.exports = { createOrder, getOrders }