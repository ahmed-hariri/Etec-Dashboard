import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import accountModel from '../../models/users';
import { accountRepository, accountTypes } from '../../dto';

/*---> Function to handle user registration (SignUp) <---*/
export const SignUpRepository: accountRepository = async (userData) => {
    const { fullName, email, password, profile, subscribe, role } = userData as accountTypes;
    try {
        const existingAccount = await accountModel.findOne({ email });
        if (existingAccount) {
            return { token: null, message: "Email already exists" }
        }
        if (role === "admin") {
            return { token: null, message: "Admin role detected" }
        }
        /*---> Hash password for better security <---*/
        const hashedPassword = await bcrypt.hash(password, 10);
        /*---> Save the user at data bas <---*/
        const newAccount = new accountModel({
            fullName: fullName, email: email,
            profile: profile, password: hashedPassword,
            subscribe: subscribe, role: role
        });
        await newAccount.save();
        /*---> Generate a token using user info and secret key <---*/
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({
            id: newAccount?._id, fullName: fullName,
            email: email, profile: profile,
            password: hashedPassword, subscribe: subscribe,
            role: role
        },
            process.env.JWT_SECRET,
            { expiresIn: '12h' });
        if (token) {
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
            role: existingAccount?.role ?? null
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
