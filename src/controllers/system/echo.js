/* ria/kach
 *
 * /src/controllers/system/echo.js - Controller for system echo
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
    let sEcho = oRequest.query.echo || "Hello, world!";

    send( oRequest, oResponse, sEcho );
}
