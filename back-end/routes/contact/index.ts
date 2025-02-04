import { Router } from "express";
import { addContactController, removeContactController } from "../../controllers/contact";

/*---> Define product routes <---*/
export const contactRoute: Router = Router();

contactRoute.post("/contact", addContactController)
contactRoute.delete("/contact/:id", removeContactController)