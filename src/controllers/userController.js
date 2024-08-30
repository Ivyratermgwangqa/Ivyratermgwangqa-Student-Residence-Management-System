import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust the path if needed

// Register a new user
const registerUser = async (req, res, next) => {
    const { email, password } = req.body;

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

        // Respond with the newly created user
        res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

// Login a user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

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
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.status(200).json({ token });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

// Get user by ID
const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with user details
        res.status(200).json({ id: user.id, email: user.email });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

// Update user details
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { email, password } = req.body;

    try {
        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        // Save the updated user
        await user.save();

        // Respond with the updated user details
        res.status(200).json({ id: user.id, email: user.email });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

// Delete a user
const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await user.destroy();

        // Respond with a success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

export default { registerUser, loginUser, getUserById, updateUser, deleteUser };