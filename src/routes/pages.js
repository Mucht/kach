/* ria/kach
 *
 * /routes/pages.js - Pages routes
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 25/11/2016
*/

import { Router } from "express";

import homePageController from "../controllers/pages/home";

let oRouter = new Router();

oRouter.get( "/", homePageController );

export default oRouter;
