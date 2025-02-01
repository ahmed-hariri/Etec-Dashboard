import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { addProductController, getProductController, removeProductController, updateProductController } from "../../controllers/product";

/*---> Define product routes <---*/
export const productRoutes: Router = Router();

productRoutes.get("/product", getProductController)
productRoutes.post("/product", authenticateToken, checkAdmin, addProductController)
productRoutes.delete("/product/:id", authenticateToken, checkAdmin, removeProductController)
productRoutes.put("/product/:id", authenticateToken, checkAdmin, updateProductController)