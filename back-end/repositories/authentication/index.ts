import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import accountModel from '../../models/user';
import { accountRepository, accountTypes } from '../../dto';

/*---> Function to handle user registration (SignUp) <---*/
export const SignUpRepository: accountRepository = async (userData) => {
    const { fullName, email, password, profile, subscribe, admin } = userData as accountTypes;
    try {
        const existingAccount = await accountModel.findOne({ email });
        if (existingAccount) {
            return { token: null, message: "Email already exists" }
        }
        /*---> Hash password for better security <---*/
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: accountTypes = {
            fullName: fullName,
            email: email,
            profile: profile,
            password: hashedPassword,
            subscribe: subscribe,
            admin: admin
        }
        /*---> Generate a token using user info and secret key <---*/
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign(newUser, process.env.JWT_SECRET, { expiresIn: '12h' });
        if (token) {
            const newAccount = new accountModel(newUser);
            await newAccount.save();
            return { token: token, message: "Account has been created!" }
        }
        return { token: null, message: "Failed to generate token" };
    } catch (error) {
        console.error("Error creating account:", error);
        return { token: null, message: `Error creating account ${error}` }
    }
}

/*---> Function to handle user login (SignIn) <---*/
export const SignInRepository: accountRepository = async (userData) => {
    const { email, password } = userData as Partial<accountTypes>
    try {
        const existingAccount = await accountModel.findOne({ email });
        if (!existingAccount) {
            return { token: null, message: 'Account not found!' }
        }
        /*---> Compare the provided password with the password in the database <---*/
        const isPasswordValid = await bcrypt.compare(password ?? '', existingAccount.password);
        if (!isPasswordValid) {
            return { token: null, message: 'Invalid credentials!' }
        }
        const oldUser: Partial<accountTypes> = {
            id: existingAccount.id,
            email: existingAccount.email,
            admin: existingAccount.admin
        }
        /*---> Generate a new token <---*/
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign(oldUser, process.env.JWT_SECRET, { expiresIn: '12h' });
        if (token) {
            return { token: token, message: 'Login successful!' }
        }
        return { token: token, message: 'Failed to generate token!' }
    } catch (error) {
        console.error("Error logging:", error);
        return { token: null, message: `Error logging ${error}` }
    }
}
