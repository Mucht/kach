/* ria/kach
 *
 * /src/controllers/ping.js - Controller for system ping
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
    send( oRequest, oResponse, true );
}
