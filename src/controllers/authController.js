import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateToken, isValidEmail, isValidPassword, handleError } from '../utils/helpers.js';

const register = async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ email, password: hashedPassword, role: role || 'user' });

        const token = generateToken(newUser);

        res.status(201).json({ id: newUser.id, email: newUser.email, role: newUser.role, token });
    } catch (error) {
        handleError(res, error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.status(200).json({ token });
    } catch (error) {
        handleError(res, error);
    }
};

const getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
        handleError(res, error);
    }
};

export default { register, login, getUserDetails };