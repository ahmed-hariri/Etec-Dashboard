import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { addProductController, getProductController, removeProductController } from "../../controllers/product";

/*---> Define product routes <---*/
export const productRoutes: Router = Router();

productRoutes.post("/product", authenticateToken, checkAdmin, addProductController)
productRoutes.get("/product", authenticateToken, checkAdmin, getProductController)
productRoutes.delete("/product/:id", authenticateToken, checkAdmin, removeProductController)