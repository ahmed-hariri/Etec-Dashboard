import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { clientInformationController, clientSubscribeController, getClientsController, updateClientInformation } from "../../controllers/users";

/*---> Define client routes <---*/
export const clientRoutes: Router = Router();

clientRoutes.get("/clients", authenticateToken, checkAdmin, getClientsController)
clientRoutes.get("/client", authenticateToken, clientInformationController)
clientRoutes.post("/subscriber", clientSubscribeController)
clientRoutes.put("/client/:id", updateClientInformation)