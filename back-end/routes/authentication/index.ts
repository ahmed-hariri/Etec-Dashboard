import { Router } from "express";
import { SignInController, SignUpController } from "../../controllers/authentication";

/*---> Define authentication routes <---*/
export const authRoutes: Router = Router();

/*---> Route for user registration (SignUp) <---*/
authRoutes.post("/register", SignUpController);

/*---> Route for user login (SignIn) <---*/
authRoutes.post("/login", SignInController);