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
    let sCountryCode = ( oRequest.query.country || "" ).toUpperCase();

    if ( !sCountryCode ) {
        error( oRequest, oResponse, "Mandatory country query params not found!", 400 );
    }

    getBanks()
        .find( {
            "country": sCountryCode,
        } )
        .toArray()
        .then( ( aBanks ) => {
            let aParsedBanks;

            // aParsedBanks = aBanks.filter( ( oBank ) => {
            //     return !oBank.deleted_at;
            // } );
            // aParsedBanks = aBanks.filter( ( oBank ) => !oBank.deleted_at );
            aParsedBanks = aBanks.filter( ( { deleted_at } ) => !deleted_at );

            aParsedBanks = aParsedBanks.map( ( { _id, country, color, name, icon, url } ) => ( {
                "id": _id,
                country, color, name, icon, url,
            } ) );

            send( oRequest, oResponse, aParsedBanks );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
