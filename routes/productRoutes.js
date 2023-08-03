const express = require( 'express' )
const router = express.Router()
const { getAllProducts, getProduct, createProduct } = require( '../controllers/productsControllers.js' )
const { requestAuth } = require( '../middleware/auth.js' )
router.get( '/', requestAuth, getAllProducts )
router.get( '/:_id', requestAuth, getProduct )
router.post( '/', createProduct )
module.exports = router;