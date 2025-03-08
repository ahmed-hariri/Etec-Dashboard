import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { getAllPurchesedController , removePurchesedController} from "../../controllers/purchesed";

/*---> Define purchesed product routes <---*/
export const purchesedRoutes: Router = Router();

purchesedRoutes.get("/purcheseds", authenticateToken, checkAdmin, getAllPurchesedController)
purchesedRoutes.delete("/purchesed/:id", authenticateToken, checkAdmin, removePurchesedController)