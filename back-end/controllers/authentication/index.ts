import { functionControllers, userData } from "../../dto/auth";
import { SignInRepository, SignUpRepository } from "../../repositories/authentication";

/*---> Sign Up Controller <---*/
export const SignUpController: functionControllers = async (req, res) => {
    const { id, fullName, email, password, profile, subscribe, admin } = req.body as userData
    if (!fullName || !email || !password) {
        res.send(400).type("json").json({ message: "You dont have all information" });
        return
    }
    try {
        const userData: userData = { id, fullName, email, password, profile, subscribe, admin }
        const { token, message } = await SignUpRepository(userData);
        if (token) {
            res.status(201).type("json").json({ message, token });
        } else {
            res.status(400).type("json").json({ message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).type("json").json({ message: "Error creating account" });
    }
}

/*---> Sign In Controller <---*/
export const SignInController: functionControllers = async (req, res) => {
    const { email, password }: userData = req.body;
    if (!email || !password) {
        res.send(400).type("json").json({ message: "You dont have all information" });
        return
    }
    try {
        const userData: Partial<userData> = { email, password }
        const { token, message } = await SignInRepository(userData);
        if (token) {
            res.status(201).type("json").json({ message, token });
        } else {
            res.status(400).type("json").json({ message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).type("json").json({ message: "Error login account" });
    }
}