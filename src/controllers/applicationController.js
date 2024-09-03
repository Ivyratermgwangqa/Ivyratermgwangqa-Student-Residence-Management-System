import Application from '../models/Application.js';
import Residence from '../models/Residence.js';
import User from '../models/User.js';

// Create a new application
export const createApplication = async (req, res, next) => {
    const { residenceId } = req.body;

    try {
        const userId = req.user.id; // Assuming the user is logged in

        // Check if the residence exists
        const residence = await Residence.findByPk(residenceId);
        if (!residence) {
            return res.status(404).json({ message: 'Residence not found' });
        }

        // Create the application
        const newApplication = await Application.create({
            userId,
            residenceId,
            status: 'pending', // Default status
        });

        res.status(201).json({ message: 'Application created successfully', application: newApplication });
    } catch (error) {
        next(error);
    }
};

// Get all applications
export const getAllApplications = async (req, res, next) => {
    try {
        const applications = await Application.findAll({
            include: [
                { model: Residence, as: 'residence' },
                { model: User, as: 'user' },
            ],
        });

        res.status(200).json(applications);
    } catch (error) {
        next(error);
    }
};

// Get an application by ID
export const getApplicationById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const application = await Application.findByPk(id, {
            include: [
                { model: Residence, as: 'residence' },
                { model: User, as: 'user' },
            ],
        });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        next(error);
    }
};

// Update an application's status
export const updateApplicationStatus = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const application = await Application.findByPk(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ message: 'Application status updated', application });
    } catch (error) {
        next(error);
    }
};

// Delete an application
export const deleteApplication = async (req, res, next) => {
    const { id } = req.params;

    try {
        const application = await Application.findByPk(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        await application.destroy();
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        next(error);
    }
};
