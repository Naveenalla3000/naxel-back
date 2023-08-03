const express = require( 'express' );
const router = express.Router();
const { createSPProduct, getSPProducts, deleteSPProduct } = require( '../controllers/spProductsControllers.js' );
const { requestAuth } = require( '../middleware/auth.js' );

router.post( '/:_uid/:_pid', requestAuth, createSPProduct );
router.get( '/:_uid', requestAuth, getSPProducts ); 
router.delete( '/:_uid/:_pid', requestAuth, deleteSPProduct ); 

module.exports = router;
