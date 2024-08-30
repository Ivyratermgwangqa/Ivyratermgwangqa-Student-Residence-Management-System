// Import necessary modules
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error stack for debugging
    console.error(err.stack);

    // Determine the response status
    const statusCode = err.status || 500;

    // Determine the response message
    const responseMessage = err.message || 'Internal Server Error';

    // Respond with JSON
    res.status(statusCode).json({
        status: statusCode,
        message: responseMessage,
        // Include stack trace only in development mode
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandler;