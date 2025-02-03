import { Router } from "express";
import { addOrderController } from "../../controllers/order";

/*---> Define product routes <---*/
export const orderRoutes: Router = Router();

orderRoutes.post("/order", addOrderController)