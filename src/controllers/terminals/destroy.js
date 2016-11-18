/* ria/kach
 *
 * /src/controllers/terminals/destroy.js - Controller for terminal destroy
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 18/11/2016
*/

// import Promise from "bluebird";
import { ObjectID } from "mongodb";
import getTerminals from "../../models/terminals";
import { send, error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {

    let oTerminalID;

    // 1. Verify ID
    try {
        oTerminalID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "invalid ID!" ), 400 );
    }

    // 2. Delete
    getTerminals()
        .deleteOne( {
            "_id": oTerminalID,
        } )
        .then( ( { deletedCount } ) => {
            if ( deletedCount === 1 ) {
                return send( oRequest, oResponse, null, 204 );
            }

            return error( oRequest, oResponse, "Unknown deletion error", 500 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
