/* ria/kach
 *
 * /src/models/banks.js - Model for banks
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import Promise from "bluebird";
import { db } from "../core/mongodb";
import { ObjectID } from "mongodb";

export default function() {
    return db.collection( "banks" );
}

let fCheckBank;

fCheckBank = function( sBankID ) {
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

    return db.collection( "banks" )
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

export {
    fCheckBank as checkBank,
};
