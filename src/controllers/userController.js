import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

// Register a new user
export const registerUser = async (req, res, next) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the username or email is already taken
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'student', // Default role is 'student'
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        next(error);
    }
};

// Login a user
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get a user by ID
export const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Update a user's information
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        next(error);
    }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};