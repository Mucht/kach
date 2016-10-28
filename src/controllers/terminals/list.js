/* ria/kach
 *
 * /src/controllers/terminals/list.js - Controllers for terminals list
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 28/10/2016
*/

import getTerminals from "../../models/terminals";
import { send, error } from "../../core/utils/api";
import distance from "jeyo-distans";

export default function( oRequest, oResponse ) {

    let iLatitude = +oRequest.query.latitude,
        iLongitude = +oRequest.query.longitude,
        oCurrentPosition;

    
}
