const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";

const state = {
    db : null,
}

module.exports = {

    connectToServer: function( callback ) {
        const dbname = 'sunnydiamond'
      MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
        state.db  = client.db(dbname);
        return callback( err );
      } );
    },
  
    
  };
 module.exports.get = function() {
    return state.db;
  }
  