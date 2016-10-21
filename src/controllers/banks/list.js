/* ria/kach
 *
 * /src/controllers/banks/list.js - Controllers for banks list
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import getBanks from "../../models/banks";
import { send, error } from "../../core/utils/api.js";

export default function( oRequest, oResponse ) {
    let sCountryCode = ( oRequest.params.country || "" ).toUpperCase();

    getBanks()
        .find( {
            "country": sCountryCode,
        } )
        .toArray()
        .then( ( aBanks ) => {
            // TODO: filter banks
            send( oRequest, oResponse, aBanks );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
