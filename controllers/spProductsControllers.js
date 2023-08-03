const { SPProducts } = require( '../models/specialProducts.js' )
const { User } = require( '../models/userModels.js' )
const { Product } = require( '../models/productsModels.js' )
const createSPProduct = async ( req, res ) => {
    try {
        const { _uid, _pid } = req.params
        if ( !_pid || !_uid ) throw Error( "User._Id OR Product._id is/are missing" )
        const alreadySelectde = await SPProducts.findOne( { user: _uid, product: _pid } )
        if ( alreadySelectde ) return res.status( 200 ).json( { message: "Product is already chosen" } );
        const user = await User.findById( { _id: _uid } )
        if ( !user ) throw Error( "User not found" )
        const product = await Product.findById( { _id: _pid } );
        if ( !product ) throw Error( "Product not found" )
        const { productName, productDescription, productRating, productOldPrice, productNewPrice, productDiscount, productImageUri } = product
        const spproduct = await SPProducts.create( {
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
        if ( !spproduct ) throw Error( "Unable to add to fav" )
        res.status( 201 ).json( spproduct, product, user )
    }
    catch ( err ) {
        res.status( 400 ).json( err.message )
    }
}
const getSPProducts = async ( req, res ) => {
    try {
        const { _uid } = req.params;
        if ( !_uid ) throw new Error( "User ID is missing" )
        const user = await User.findById( { _id: _uid } );
        if ( !user ) throw new Error( "User not found" )
        const products = await SPProducts.find( { user: _uid } );
        if ( !products ) throw new Error( "No products found for this user" )
        if ( products.length === 0 ) {
            return res.status( 400 ).json( { error: "Your cart is empty" } )
        }
        res.status( 200 ).json( products );
    } catch ( err ) {
        res.status( 400 ).json( { error: err.message } );
        console.error( "Error fetching products:", err.message );
    }
};

const deleteSPProduct = async ( req, res ) => {
    try {
        const { _uid, _pid } = req.params
        if ( !_pid || !_uid ) throw Error( "User._Id OR Product._id is/are missing" )
        const user = await SPProducts.find( { user: _uid } )
        if ( !user || user.length === 0 ) throw Error( "User not found" )
        const deleteProduct = await SPProducts.findOneAndDelete( { user: _uid, _id: _pid } );
        if ( !deleteProduct ) throw Error( "unable to delect the product" )
        res.status( 200 ).json( deleteProduct )
    }
    catch ( err ) {
        res.status( 400 ).json( err.message )
        console.log( err.message )
    }
}
module.exports = { createSPProduct, getSPProducts, deleteSPProduct }