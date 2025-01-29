import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { addProductController } from "../../controllers/product";

/*---> Define product routes <---*/
export const productRoutes: Router = Router();

productRoutes.post("/product", authenticateToken, checkAdmin, addProductController)