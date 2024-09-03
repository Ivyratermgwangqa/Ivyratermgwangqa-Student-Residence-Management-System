import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateToken, isValidEmail, isValidPassword, handleError } from '../utils/helpers.js';

// Register a new user or manager
export const register = async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with role
        const newUser = await User.create({ email, password: hashedPassword, role: role || 'user' });

        // Generate a JWT token
        const token = generateToken(newUser);

        // Respond with the newly created user and token
        res.status(201).json({ id: newUser.id, email: newUser.email, role: newUser.role, token });
    } catch (error) {
        handleError(res, error);
    }
};

// Login an existing user
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
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
        handleError(res, error);
    }
};

// Get user details
export const getUserDetails = async (req, res, next) => {
    try {
        // Fetch the user details from the token
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with user details
        res.status(200).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
        handleError(res, error);
    }
};

// Update user details
export const updateUserDetails = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find the user by ID
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        if (email && isValidEmail(email)) {
            user.email = email;
        }
        if (password && isValidPassword(password)) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Save the updated user details
        await user.save();

        // Respond with the updated user details
        res.status(200).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete user account
export const deleteUser = async (req, res, next) => {
    try {
        // Find the user by ID
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await user.destroy();

        // Respond with a success message
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};