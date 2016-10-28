/* ria/kach
 *
 * /src/core/express.js - Express configuration
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import express from "express";
import bodyParser from "body-parser";
import responseTime from "response-time";
import mitanEko from "mitan-eko";
import zouti from "zouti";
import systemRoutes from "../routes/system";
import banksRoutes from "../routes/banks";
import terminalsRoutes from "../routes/terminals";

const APP_PORT = "12345";

let oApp,
    fInit;

fInit = function( iAppPort = APP_PORT ) {
    if ( oApp ) {
        return oApp;
    }

    oApp = express();

    // config middlewares
    oApp.use( mitanEko( "kach" ) );
    oApp.use( responseTime() );
    oApp.use( bodyParser.json() );
    oApp.use( bodyParser.urlencoded( {
        "extended": true,
    } ) );

    // routes
    oApp.use( systemRoutes );
    oApp.use( banksRoutes );
    oApp.use( terminalsRoutes );

    // Listening
    oApp.listen( iAppPort, () => {
        zouti.success( `Server is listening on ${ iAppPort }`, "kach" );
    } );

};

export {
    fInit as init,
};
