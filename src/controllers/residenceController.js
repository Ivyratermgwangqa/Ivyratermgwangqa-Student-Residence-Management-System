import Residence from '../models/Residence.js'; // Adjust the path if needed

// Create a new residence
export const createResidence = async (req, res, next) => {
    const { name, address, capacity } = req.body;

    try {
        const newResidence = await Residence.create({ name, address, capacity });
        res.status(201).json({
            id: newResidence.id,
            name: newResidence.name,
            address: newResidence.address,
            capacity: newResidence.capacity
        });
    } catch (error) {
        console.error('Error creating residence:', error);
        next(error); // Pass errors to the error handler
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
    const { name, address, capacity } = req.body;

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

        // Save the updated residence
        await residence.save();

        // Respond with the updated residence details
        res.status(200).json({
            id: residence.id,
            name: residence.name,
            address: residence.address,
            capacity: residence.capacity
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