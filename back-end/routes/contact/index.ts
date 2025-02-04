import { Router } from "express";
import { addContactController, getContactsController, removeContactController } from "../../controllers/contact";
import { authenticateToken, checkAdmin } from "../../middleware";

/*---> Define product routes <---*/
export const contactRoute: Router = Router();

contactRoute.get("/contact", authenticateToken, checkAdmin, getContactsController)
contactRoute.post("/contact", addContactController)
contactRoute.delete("/contact/:id", authenticateToken, checkAdmin, removeContactController)