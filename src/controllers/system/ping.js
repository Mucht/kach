/* ria/kach
 *
 * /src/controllers/ping.js - Controller for system ping
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

export default function( oRequest, oResponse ) {
    oResponse.json( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": true,
        "error": false,
    } );
}
