import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { addCategoryController, getCategoryController, updateCategoryController } from "../../controllers/category";

/*---> Define category routes <---*/
export const categoryRoutes: Router = Router();

categoryRoutes.get("/category", getCategoryController);
categoryRoutes.post("/category", authenticateToken, checkAdmin, addCategoryController);
categoryRoutes.put("/category/:id", authenticateToken, checkAdmin, updateCategoryController);