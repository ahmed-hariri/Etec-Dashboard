import { Router } from "express";
import { addContactController } from "../../controllers/contact";

/*---> Define product routes <---*/
export const contactRoute: Router = Router();

contactRoute.post("/contact", addContactController)