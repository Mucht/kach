/* ria/kach
 *
 * /src/core/mongodb.js - Connector for mongodb
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import { MongoClient } form "mongodb";

const MONGO_URL = "mongodb://127.0.0.1:27017/kach";

let oDB,
    fInit;

fInit =  function(  ){
    return new Promise( ( fResolve, fReject ) => {
        MongoClient.connect( MONGO_URL, ( oError, oLinkedDB ) => {
            if ( oError ) {
                return fReject( oError );
            }

            fResolve( oDB = oLinkedDB );
        } );
    } );
};

export {
    fInit as init,
    oDB as db,
}
