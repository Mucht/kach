/* ria/kach
 *
 * /src/controllers/terminals/details.js - Controller for terminal details
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 28/10/2016
*/

import getTerminals from "../../models/terminals";
import { send, error } from "../../core/utils/api";
import { ObjectID } from "mongodb";
import distance from "jeyo-distans";

export default function( oRequest, oResponse ) {

    let sTerminalID = ( oRequest.params.id || "" ).trim(),
        iLatitude = +oRequest.query.latitude,
        iLongitude = +oRequest.query.longitude,
        oCurrentPosition;

    if ( !sTerminalID ) {
        error( oRequest, oResponse, "Invalid ID", 400 );
    }

    getTerminals()
        .findOne( {
            "_id": new ObjectID( sTerminalID ),
            "deleted_at": null,
        } )
        .then( ( { _id, bank, latitude, longitude, address, empty } ) => {

            let oCleanedTerminal;

            if ( !_id ) {
                return error( oRequest, oResponse, "Unknown Terminal", 404 );
            }

            if ( !isNaN( iLatitude ) && !isNaN( iLongitude ) ) {
                oCurrentPosition = {
                    "latitude": iLatitude,
                    "longitude": iLongitude,
                };
            }

            oCleanedTerminal = {
                "id": _id,
                "empty": !!empty,
                bank, latitude, longitude, address,
            };

            if ( oCurrentPosition ) {
                oCleanedTerminal.distance = distance( oCurrentPosition, oCleanedTerminal ) * 1000;
            }

            send( oRequest, oResponse, oCleanedTerminal );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
