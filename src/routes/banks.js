/* ria/kach
 *
 * /src/routes/banks.js - API Routes for banks
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/10/2016
*/

import { Router } from "express";
import listBanksController from "../controllers/banks/list.js"

let oRouter = new Router();

oRouter.get( "/banks", listBanksController );

export default oRouter;
