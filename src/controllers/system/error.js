/* ria/kach
 *
 * /src/controllers/system/error.js - Controller for system error
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

export default function( oRequest, oResponse ) {
    oResponse.status( 500 ).json( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": false,
        "error": {
            "message": "There is an error!",
        },
    } );
}
