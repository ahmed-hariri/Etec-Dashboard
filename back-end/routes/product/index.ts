import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { addProductController, getProductController } from "../../controllers/product";

/*---> Define product routes <---*/
export const productRoutes: Router = Router();

productRoutes.post("/product", authenticateToken, checkAdmin, addProductController)
productRoutes.get("/products", authenticateToken, checkAdmin, getProductController)