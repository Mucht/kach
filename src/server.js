/* ria/kach
 *
 * /src/server.js - main entry point
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2015
*/

import { init as initDB } from "./core/mongodb";
import { init as initExpress } from "./core/express";

const APP_PORT = 12345;

initDB()
    .then( () => initExpress( APP_PORT ) );
