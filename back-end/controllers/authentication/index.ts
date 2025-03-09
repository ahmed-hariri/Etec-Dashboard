import { functionControllers, accountTypes } from "../../dto";
import { SignInRepository, SignUpRepository } from "../../repositories/authentication";

/*---> SignUp controller <---*/
export const signUpController: functionControllers = async (req, res, next) => {
    // Destructuring
    const { fullName, email, password, profile, subscribe, role } = req.body as accountTypes
    if (!fullName || !email || !password) {
        return res.status(400).type("json").json({ message: `You dont have : ${!fullName ? "fullName" : ""} ${!email ? "email" : ""} ${!password ? "password" : ""}` });
    }
    try {
        const userData: accountTypes = { fullName, email, password, profile, subscribe, role }
        const { token, message } = await SignUpRepository(userData);
        if (token) {
            return res.status(200).type("json").json({ token, message });
        }
        return res.status(200).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}

/*---> SignIn controller <---*/
export const signInController: functionControllers = async (req, res, next) => {
    const { email, password } = req.body as accountTypes;
    if (!email || !password) {
        return res.status(400).type("json").json({ message: `You dont have : ${!email ? "email" : ""} ${!password ? "password" : ""}` });
    }
    try {
        const userData: Partial<accountTypes> = { email, password }
        const { token, message } = await SignInRepository(userData);
        if (token) {
            return res.status(200).type("json").json({ token, message });
        }
        return res.status(200).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}