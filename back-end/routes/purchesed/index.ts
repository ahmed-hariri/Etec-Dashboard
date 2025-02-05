import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { purchesedController } from "../../controllers/purchesed";

/*---> Define purchesed product routes <---*/
export const purchesedRoutes: Router = Router();

purchesedRoutes.get("/purchesed", authenticateToken, checkAdmin, purchesedController)