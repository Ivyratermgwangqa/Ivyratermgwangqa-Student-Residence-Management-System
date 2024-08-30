import express from 'express';
import userRoutes from './routes/userRoutes.js';
import residenceRoutes from './routes/residenceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authenticateToken from './middlewares/authMiddleware.js';
import errorHandler from './middlewares/errorHandler.js'; // Import the error handler
import dotenv from 'dotenv';
import sequelize from './config/database.js';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Apply authentication middleware globally (or to specific routes)
app.use('/api', authenticateToken);

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/residences', residenceRoutes);
app.use('/api/auth', authRoutes);

// Apply error handler middleware after all routes
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

export default app;