const mongoose = require( 'mongoose' );
const { Product } = require( '../models/productsModels.js' );
const getAllProducts = async ( req, res ) => {
    try {
        const allProducts = await Product.find( {} );
        if ( !allProducts ) throw new Error( "Unable to fetch/get the product" )
        if ( allProducts.length === 0 ) return res.status( "No products are avaiable" )
        res.status( 200 ).json( { allProducts } )
    }
    catch ( err ) {
        res.status( 404 ).json( err.message )
        console.log( err.message )
    }
}
const getProduct = async ( req, res ) => {
    try {
        const { _id } = req.params;
        if ( !_id ) throw Error( "NO Id is received" )
        if ( !mongoose.Types.ObjectId.isValid( _id ) ) throw Error( "in valid _id avaiable" )
        let product = await Product.findById( { _id } )
        if ( !product ) throw Error( "Unable to fetch/get the product" )
        res.status( 200 ).json( product )
    }
    catch ( err ) {
        res.status( 400 ).json( err.message )
        console.log( err.message )
    }
}
const createProduct = async ( req, res ) => {
    try {
        const { productName, productDescription, productRating, productOldPrice, productNewPrice, productDiscount, productImageUri } = req.body
        if ( !productName || !productDescription || !productRating || !productOldPrice || !productNewPrice || !productDiscount || !productImageUri ) throw Error( "Please fill all the fields" )
        const createProduct = await Product.create( {
            productName,
            productDescription,
            productRating,
            productOldPrice,
            productNewPrice,
            productDiscount,
            productImageUri
        } );
        if ( !createProduct ) throw Error( "Not inserted " )
        res.status( 201 ).json( createProduct )
    }
    catch ( err ) {
        res.status( 400 ).json( err.message )
    }
}
module.exports = { getAllProducts, getProduct, createProduct }