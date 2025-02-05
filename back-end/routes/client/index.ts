import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { clientInformationController, clientSubscribeController, getClientsController, getClientsSubscribeController } from "../../controllers/client";

/*---> Define client routes <---*/
export const clientRoutes: Router = Router();

clientRoutes.get("/client", authenticateToken, checkAdmin, getClientsController)
clientRoutes.get("/client/:id", clientInformationController)
clientRoutes.get("/subscriber", authenticateToken, checkAdmin, getClientsSubscribeController)
clientRoutes.post("/subscriber", clientSubscribeController)