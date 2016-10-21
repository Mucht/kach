/* ria/kach
 *
 * /src/controllers/system/echo.js - Controller for system echo
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

export default function( oRequest, oResponse ) {

    let sEcho = oRequest.query.echo || "Hello, world!";

    oResponse.send( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": sEcho,
        "error": false,
    } );
}
