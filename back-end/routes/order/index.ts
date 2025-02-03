import { Router } from "express";
import { addOrderController, getOrdersController, statusOrderController } from "../../controllers/order";
import { authenticateToken, checkAdmin } from "../../middleware";

/*---> Define product routes <---*/
export const orderRoutes: Router = Router();

orderRoutes.get("/order", authenticateToken, checkAdmin, getOrdersController)
orderRoutes.post("/order", addOrderController)
orderRoutes.put("/order/:id", authenticateToken, checkAdmin, statusOrderController);