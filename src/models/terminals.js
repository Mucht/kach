/* ria/kach
 *
 * /src/models/terminals.js - Model for terminals
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import { db } from "../core/mongodb";

let oTerminals = db.collection( "terminals" );

export default oTerminals;
