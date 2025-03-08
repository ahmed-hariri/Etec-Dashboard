import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { addCategoryController, getCategoryController, removeCategoryController, updateCategoryController } from "../../controllers/categorys";

/*---> Define category routes <---*/
export const categoryRoutes: Router = Router();

categoryRoutes.get("/categorys", getCategoryController);
categoryRoutes.post("/category", authenticateToken, checkAdmin, addCategoryController);
categoryRoutes.put("/category/:id", authenticateToken, checkAdmin, updateCategoryController);
categoryRoutes.delete("/category/:id", authenticateToken, checkAdmin, removeCategoryController);