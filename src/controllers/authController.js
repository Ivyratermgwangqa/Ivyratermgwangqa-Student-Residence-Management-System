import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateToken, isValidEmail, isValidPassword, handleError } from '../utils/helpers.js';

// Register a new user
const register = async (req, res, next) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ email, password: hashedPassword });

        // Generate a JWT token
        const token = generateToken(newUser);

        // Respond with the newly created user and token
        res.status(201).json({ id: newUser.id, email: newUser.email, token });
    } catch (error) {
        handleError(res, error); // Use the utility function for error handling
    }
};

// Login an existing user
const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = generateToken(user);

        // Respond with the token
        res.status(200).json({ token });
    } catch (error) {
        handleError(res, error); // Use the utility function for error handling
    }
};

// Get user details
const getUserDetails = async (req, res, next) => {
    try {
        // Fetch the user details from the token
        const user = await User.findByPk(req.user.id); // Assuming req.user contains user info from the token
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with user details
        res.status(200).json({ id: user.id, email: user.email });
    } catch (error) {
        handleError(res, error); // Use the utility function for error handling
    }
};

export default { register, login, getUserDetails };