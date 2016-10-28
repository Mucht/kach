/* ria/kach
 *
 * /src/core/utils/position.js - Position checker utility
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 28/10/2016
*/

export default function( iLatitude, iLongitude ) {

    let oPosition;

    if ( isNaN( iLatitude ) || isNaN( iLongitude ) ) {
        return false;
    }

    if ( iLatitude < -90 || iLatitude > 90 ) {
        return false;
    }

    if ( iLongitude < -180 || iLongitude > 180 ) {
        return false
    }

    return {
        "latitude": iLatitude,
        "longitude": iLongitude,
    };
}
