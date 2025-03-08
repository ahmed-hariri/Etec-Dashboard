import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { addProductController, getProductByIdController, getProductsController, removeProductController, updateProductController } from "../../controllers/products";

/*---> Define product routes <---*/
export const productRoutes: Router = Router();

productRoutes.get("/products", getProductsController)
productRoutes.get("/product/:id", getProductByIdController)
productRoutes.post("/product", authenticateToken, checkAdmin, addProductController)
productRoutes.delete("/product/:id", authenticateToken, checkAdmin, removeProductController)
productRoutes.put("/product/:id", authenticateToken, checkAdmin, updateProductController)