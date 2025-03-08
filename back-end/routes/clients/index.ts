import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { clientInformationController, clientSubscribeController, getClientsController, getClientsSubscribeController } from "../../controllers/clients";

/*---> Define client routes <---*/
export const clientRoutes: Router = Router();

clientRoutes.get("/clients", authenticateToken, checkAdmin, getClientsController)
clientRoutes.get("/client", authenticateToken, clientInformationController)
clientRoutes.get("/subscribers", authenticateToken, checkAdmin, getClientsSubscribeController)
clientRoutes.post("/subscriber", clientSubscribeController)