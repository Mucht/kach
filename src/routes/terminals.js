/* ria/kach
 *
 * /src/routes/terminals.js - API Routes for terminals
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 28/10/2016
*/

import { Router } from "express";
import list from "../controllers/terminals/list.js";
import details from "../controllers/terminals/details.js";
import create from "../controllers/terminals/create.js";
// import update from "../controllers/terminals/update.js";
import destroy from "../controllers/terminals/destroy.js";

let oRouter = new Router();

oRouter.get( "/terminals", list );
oRouter.get( "/terminals/:id", details );
oRouter.post( "/terminals", create );
// oRouter.patch( "/terminals/:id", update );
oRouter.delete( "/terminals/:id", destroy );

export default oRouter;
