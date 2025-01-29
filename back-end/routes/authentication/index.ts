import { Router } from "express";
import { SignInController, SignUpController } from "../../controllers/authentication";

/*---> Define authentication routes <---*/
export const authRoutes: Router = Router();

authRoutes.post("/register", SignUpController);
authRoutes.post("/login", SignInController);