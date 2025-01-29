import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import accountModel from '../../models/user';
import { functionRepository, user, userData } from '../../dto/auth';

/*---> Function to handle user registration (SignUp) <---*/
export const SignUpRepository: functionRepository = async (userData) => {
    const { id, fullName, email, password, profile, subscribe, admin } = userData;
    try {
        const existingAccount: user | null = await accountModel.findOne({ email });
        if (existingAccount) {
            return { token: null, message: "Email already exists" }
        }
        /*---> Hash password for better security <---*/
        const hashedPassword: string = await bcrypt.hash(password ?? '', 10);
        const userData: Partial<userData> = {
            id: id,
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
        const token: string = jwt.sign(userData, process.env.JWT_SECRET);
        if (token) {
            const newAccount: user | null = new accountModel(userData);
            await newAccount.save();
            return { token: token, message: "Account has been created!" }
        } else {
            return { token: null, message: "Failed to generate token" };
        }
    } catch (error) {
        console.error("Error creating account:", error);
        return { token: null, message: `Error creating account ${error}` }
    }

}

/*---> Function to handle user login (SignIn) <---*/
export const SignInRepository: functionRepository = async (userData) => {
    const { email, password }: Partial<userData> = userData;
    if (!email || !password) {
        return { token: null, message: 'You dont have all information' }
    }
    try {
        const existingAccount: user | null = await accountModel.findOne({ email });
        if (!existingAccount) {
            return { token: null, message: 'Account not found!' }
        }
        /*---> Compare the provided password with the password in the database <---*/
        const isPasswordValid: boolean = await bcrypt.compare(password, existingAccount.password);
        if (!isPasswordValid) {
            return { token: null, message: 'Invalid credentials!' }
        }
        const userData: Partial<userData> = {
            id: existingAccount.id,
            email: existingAccount.email
        }
        /*---> Generate a new token <---*/
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token: string | null = jwt.sign(userData, process.env.JWT_SECRET);
        if (token) {
            return { token: token, message: 'Login successful!' }
        } else {
            return { token: token, message: 'Failed to generate token!' }
        }
    } catch (error) {
        console.error("Error logging:", error);
        return { token: null, message: `Error logging ${error}` }
    }
}
