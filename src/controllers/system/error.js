/* ria/kach
 *
 * /src/controllers/system/error.js - Controller for system error
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
    send( oResponse, oRequest, { "message": "There is an error!" } );
}
