import Residence from '../models/Residence.js';
import Application from '../models/Application.js';

// Create a new residence
export const createResidence = async (req, res, next) => {
    const { name, address, capacity, description } = req.body;

    try {
        const newResidence = await Residence.create({
            name,
            address,
            capacity,
            description,
            managerId: req.user.id, // Assuming the manager creating the residence is logged in
        });

        res.status(201).json({ message: 'Residence created successfully', residence: newResidence });
    } catch (error) {
        next(error);
    }
};

// Accept an application
export const acceptApplication = async (req, res, next) => {
    const { applicationId } = req.params;

    try {
        const application = await Application.findByPk(applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = 'accepted';
        await application.save();

        res.status(200).json({ message: 'Application accepted', application });
    } catch (error) {
        next(error);
    }
};

// Decline an application
export const declineApplication = async (req, res, next) => {
    const { applicationId } = req.params;

    try {
        const application = await Application.findByPk(applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = 'declined';
        await application.save();

        res.status(200).json({ message: 'Application declined', application });
    } catch (error) {
        next(error);
    }
};

// Get all applications for a manager's residences
export const getApplications = async (req, res, next) => {
    try {
        const residences = await Residence.findAll({ where: { managerId: req.user.id } });
        const residenceIds = residences.map(residence => residence.id);

        const applications = await Application.findAll({ where: { residenceId: residenceIds } });

        res.status(200).json({ applications });
    } catch (error) {
        next(error);
    }
};

// Get all residences
export const getAllResidences = async (req, res, next) => {
    try {
        // Fetch all residences
        const residences = await Residence.findAll();

        // Respond with the list of residences
        res.status(200).json(residences);
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

// Get a residence by ID
export const getResidenceById = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the residence by ID
        const residence = await Residence.findByPk(id);
        if (!residence) {
            return res.status(404).json({ message: 'Residence not found' });
        }

        // Respond with the residence details
        res.status(200).json(residence);
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

// Update residence details
export const updateResidence = async (req, res, next) => {
    const { id } = req.params;
    const { name, address, capacity, description } = req.body;

    try {
        // Find the residence by ID
        const residence = await Residence.findByPk(id);
        if (!residence) {
            return res.status(404).json({ message: 'Residence not found' });
        }

        // Update residence details
        if (name) residence.name = name;
        if (address) residence.address = address;
        if (capacity) residence.capacity = capacity;
        if (description) residence.description = description;

        // Save the updated residence
        await residence.save();

        // Respond with the updated residence details
        res.status(200).json({
            id: residence.id,
            name: residence.name,
            address: residence.address,
            capacity: residence.capacity,
            description: residence.description
        });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

// Delete a residence
export const deleteResidence = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the residence by ID
        const residence = await Residence.findByPk(id);
        if (!residence) {
            return res.status(404).json({ message: 'Residence not found' });
        }

        // Delete the residence
        await residence.destroy();

        // Respond with a success message
        res.status(200).json({ message: 'Residence deleted successfully' });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};