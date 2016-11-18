/* ria/kach
 *
 * /src/controllers/terminals/create.js - Controller for terminal create
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 18/11/2016
*/

import { ObjectID } from "mongodb";

import getTerminals from "../../models/terminals";
import { checkBank } from "../../models/banks";
import { send, error } from "../../core/utils/api";
import checkPosition from "../../core/utils/position";

export default function( oRequest, oResponse ) {

    const POST = oRequest.body;

        // le + converti directement en nombre.
    let iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        sBankID = ( POST.bank || "" ).trim(),
        sAddress = ( POST.address || "" ).trim(),
        oPosition = checkPosition( iLatitude, iLongitude ),
        oTerminal,
        fCreateTerminal;

    // 1er chose on vérifie sur latitude et longitude sont correct.
    if ( !oPosition ) {
        return error( oRequest, oResponse, "Invalid position", 400 );
    }
    // Pour tester si ça marche dans insomnia
    // send( oRequest, oResponse, true );

    // Si lat et long sont correct on enregistre les donnée
    oTerminal = {
        "latitude": oPosition.latitude,
        "longitude": oPosition.longitude,
        "created_at": new Date(),
        "updated_at": new Date(),
    };

    // Si on à l'adresse, on l'ajoute dans le tableau oTerminal.
    sAddress && ( oTerminal.adress = sAddress );

    fCreateTerminal = ( bHasBank ) => {
        if ( bHasBank ) {
            oTerminal.bank = new ObjectID( sBankID );
        }

        // On fait un return de promise (insertOne) pour pouvoir l'insérer dans les promise plus bas.
        return getTerminals()
            .insertOne( oTerminal );
    };

    checkBank( sBankID )
        .then( fCreateTerminal )
        .then( () => {
            // if all is ok.
            send( oRequest, oResponse, {
                "id": oTerminal._id,
                "address": oTerminal.address ||  null,
                "bank": oTerminal.bank ||  null,
                "latitude": oTerminal.latitude,
                "longitude": oTerminal.longitude,
            }, 201 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
