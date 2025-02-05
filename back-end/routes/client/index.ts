import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { clientInformationController, clientSubscribeController, getClientsController, getClientsSubscribeController } from "../../controllers/client";

/*---> Define client routes <---*/
export const clientRoutes: Router = Router();

clientRoutes.get("/clients", authenticateToken, checkAdmin, getClientsController)
clientRoutes.get("/client", authenticateToken, clientInformationController)
clientRoutes.get("/subscriber", authenticateToken, checkAdmin, getClientsSubscribeController)
clientRoutes.post("/subscriber", clientSubscribeController)