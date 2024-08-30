import jwt from 'jsonwebtoken';

// Function to generate JWT tokens
export const generateToken = (user) => {
    // Ensure to set an appropriate expiration time
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

// Function to validate email format
export const isValidEmail = (email) => {
    // Simple regex for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to validate password strength
export const isValidPassword = (password) => {
    // Example: password should be at least 8 characters long
    return password.length >= 8;
};

// Function to handle errors
export const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'An unexpected error occurred' });
};

// Function to sanitize user input
export const sanitizeInput = (input) => {
    // Remove any potentially dangerous characters
    return input.replace(/<[^>]*>/g, '');
};

// Function to format date
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

// Function to paginate results
export const paginateResults = (model, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return model.findAll({
        limit,
        offset,
    });
};

// Function to check if an object is empty
export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
};

export default {
    generateToken,
    isValidEmail,
    isValidPassword,
    handleError,
    sanitizeInput,
    formatDate,
    paginateResults,
    isEmptyObject
};