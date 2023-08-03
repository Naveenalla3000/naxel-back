const mongoose = require( 'mongoose' )
const { User } = require( '../models/userModels.js' )
const { Product } = require( '../models/productsModels.js' )
const spectialProductSchema = new mongoose.Schema( {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productRating: { type: Number, required: true },
    productOldPrice: { type: Number, required: true },
    productNewPrice: { type: Number, required: true },
    productDiscount: { type: Number, required: true },
    productImageUri: { type: String, required: true },
}, {
    timestamps: true
} );
const SPProducts = mongoose.model( 'spModel', spectialProductSchema )
module.exports = { SPProducts }