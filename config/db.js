const mongoose = require( 'mongoose' )
const connDB = async () => {
    await mongoose.connect( process.env.MONGO_URL )
        .then( () => {
            console.log( `mongoDB connected to ${ mongoose.connection.host }` );
        } )
        .catch( ( err ) => {
            console.log( `MongoDBError: ${ err }` );
            console.log( `server is stopped....` );
            process.exit( 1 );
        } );
}
module.exports = { connDB }