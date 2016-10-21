/* ria/kach
 *
 * /src/models/banks.js - Model for banks
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

// TODO: refactor this ( init models from db connector )

import { db } from "../core/mongodb";

export default function() {
    return db.collection( "banks" );
}
