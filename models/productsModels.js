const mongoose = require( 'mongoose' )
const productSchema = new mongoose.Schema( {
    productName: { type: String },
    productDescription: { type: String },
    productRating: { type: Number },
    productOldPrice: { type: Number },
    productNewPrice: { type: Number },
    productDiscount: { type: Number },
    productImageUri: { type: String },
}, {
    timestamps: true,
} );
const Product = mongoose.model( 'Product', productSchema );
module.exports = { Product };