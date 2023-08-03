const express = require( 'express' )
const router = express.Router()
const { createOrder, getOrders } = require( '../controllers/orderControllers.js' )
const { requestAuth } = require( '../middleware/auth.js' )
router.post( '/:_uid/:_pid', requestAuth, createOrder )
router.get( '/:_uid', requestAuth, getOrders )
module.exports = router