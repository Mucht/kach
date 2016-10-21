/* ria/kach
 *
 * /src/models/banks.js - Model for banks
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import { db } from "../core/mongodb";

let oBanks = db.collection( "banks" );

export default oBanks;
