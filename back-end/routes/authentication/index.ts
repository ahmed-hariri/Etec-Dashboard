import { Router } from "express";
import { signInController, signUpController } from "../../controllers/authentication";

/*---> Define authentication routes <---*/
export const authRoutes: Router = Router();

authRoutes.post("/register", signUpController);
authRoutes.post("/login", signInController);