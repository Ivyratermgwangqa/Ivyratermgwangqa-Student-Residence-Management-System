import express from 'express';
import { sequelize } from './models/index.js'; // Ensure this path is correct
import userRoutes from './routes/userRoutes.js'; // Ensure this path is correct
import residenceRoutes from './routes/residenceRoutes.js'; // Ensure this path is correct

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/residences', residenceRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // Sync models with the database
        console.log('Database synchronized.');

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};
startServer();
