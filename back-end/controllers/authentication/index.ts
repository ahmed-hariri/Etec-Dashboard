import { functionControllers, accountTypes } from "../../dto";
import { SignInRepository, SignUpRepository } from "../../repositories/authentication";

/*---> SignUp controller <---*/
export const SignUpController: functionControllers = async (req, res, next) => {
    // Destructuring
    const { id, fullName, email, password, profile, subscribe, admin } = req.body as accountTypes
    if (!fullName || !email || !password) {
        return res.status(400).type("json").json({ message: "You dont have all information" });
    }
    try {
        const userData: accountTypes = { id, fullName, email, password, profile, subscribe, admin }
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
    const { email, password } = req.body as accountTypes;
    if (!email || !password) {
        return res.status(400).type("json").json({ message: "You dont have all information" });
    }
    try {
        const userData: Partial<accountTypes> = { email, password }
        const { token, message } = await SignInRepository(userData);
        if (token) {
            return res.status(200).type("json").json({ message, token });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}