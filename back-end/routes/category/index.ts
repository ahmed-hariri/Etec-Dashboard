import { Router } from "express";
import { authenticateToken, checkAdmin } from "../../middleware";
import { getCategoryController } from "../../controllers/category";

/*---> Define category routes <---*/
export const categoryRoutes: Router = Router();

categoryRoutes.get("/category", authenticateToken, checkAdmin, getCategoryController);