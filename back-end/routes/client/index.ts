import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { getClientsController } from "../../controllers/client";

/*---> Define client routes <---*/
export const clientRoutes: Router = Router();

clientRoutes.get("/client", authenticateToken, checkAdmin, getClientsController)