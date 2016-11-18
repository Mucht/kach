/* ria/kach
 *
 * /src/controllers/terminals/create.js - Controller for terminal create
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 18/11/2016
*/

import Promise from "bluebird";
import { ObjectID } from "mongodb";

import getTerminals from "../../models/terminals";
import getBanks from "../../models/banks";
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
        fCheckBank,
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
    // Si la bank existe déjà, on l'ajoute PAS dans le tableau oTerminal.
    // On va le faire en deux fois. Problème : pour vérifier si elle existe on doit vérifier dans la DB et ça prend du temps.
    // On utilise les promises donc on ajoute dans les import.
    fCheckBank = () => {
        let oBankID;

        // si la bank n'existe pas déjà on renvoit false.
        if ( !sBankID ) {
            return Promise.resolve( false );
        }

        // le try permet de ne pas faire planter le tout, mais il passe à catch à la place.
        // Si ça fonctionne on à un objet oBank.
        try {
            oBankID = new ObjectID( sBankID );
        } catch ( oError ) {
            return Promise.reject( new Error( "Invalid Bank ID !" ) );
        }

        return getBanks()
            .findOne( {
                "_id": oBankID,
            } )
            .then( ( oBank ) => {
                if ( oBank ) {
                    return Promise.resolve( true );
                }

                return Promise.reject( new Error( "Unknown Bank !" ) );
            } );
    };

    fCreateTerminal = ( bHasBank ) => {
        if ( bHasBank ) {
            oTerminal.bank = new ObjectID( sBankID );
        }

        // On fait un return de promise (insertOne) pour pouvoir l'insérer dans les promise plus bas.
        return getTerminals()
            .insertOne( oTerminal );
    };

    fCheckBank()
        .then( fCreateTerminal )
        .then( () => {
            // if all is ok.
            send( oRequest, oResponse, oTerminal, 201 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
