import { functionControllers, userData } from "../../dto/auth";
import { SignInRepository, SignUpRepository } from "../../repositories/authentication";

/*---> SignUp controller <---*/
export const SignUpController: functionControllers = async (req, res, next) => {
    // Destructuring
    const { id, fullName, email, password, profile, subscribe, admin } = req.body as userData
    if (!fullName || !email || !password) {
        return res.status(400).type("json").json({ message: "You dont have all information" });
    }
    try {
        const userData: userData = { id, fullName, email, password, profile, subscribe, admin }
        const { token, message } = await SignUpRepository(userData);
        if (token) {
            return res.status(201).type("json").json({ message, token });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}

/*---> SignIn controller <---*/
export const SignInController: functionControllers = async (req, res, next) => {
    const { email, password } = req.body as userData;
    if (!email || !password) {
        return res.status(400).type("json").json({ message: "You dont have all information" });
    }
    try {
        const userData: Partial<userData> = { email, password }
        const { token, message } = await SignInRepository(userData);
        if (token) {
            return res.status(200).type("json").json({ message, token });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}