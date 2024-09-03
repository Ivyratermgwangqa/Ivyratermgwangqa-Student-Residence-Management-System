// src/controllers/residenceController.js
import Residence from '../models/Residence.js';

// Create a new residence
export const createResidence = async (req, res, next) => {
    const { name, address, capacity } = req.body;
    try {
        const newResidence = await Residence.create({ name, address, capacity });
        res.status(201).json({ message: 'Residence created successfully', residence: newResidence });
    } catch (error) {
        next(error);
    }
};

// Get all residences
export const getAllResidences = async (req, res, next) => {
    try {
        const residences = await Residence.findAll();
        res.status(200).json({ residences });
    } catch (error) {
        next(error);
    }
};

// Get a residence by ID
export const getResidenceById = async (req, res, next) => {
    const { residenceId } = req.params;
    try {
        const residence = await Residence.findByPk(residenceId);
        if (!residence) {
            return res.status(404).json({ message: 'Residence not found' });
        }
        res.status(200).json({ residence });
    } catch (error) {
        next(error);
    }
};

// Update a residence
export const updateResidence = async (req, res, next) => {
    const { residenceId } = req.params;
    const { name, address, capacity } = req.body;

    try {
        const residence = await Residence.findByPk(residenceId);
        if (!residence) {
            return res.status(404).json({ message: 'Residence not found' });
        }

        residence.name = name || residence.name;
        residence.address = address || residence.address;
        residence.capacity = capacity || residence.capacity;

        await residence.save();

        res.status(200).json({ message: 'Residence updated successfully', residence });
    } catch (error) {
        next(error);
    }
};

// Delete a residence
export const deleteResidence = async (req, res, next) => {
    const { residenceId } = req.params;

    try {
        const residence = await Residence.findByPk(residenceId);
        if (!residence) {
            return res.status(404).json({ message: 'Residence not found' });
        }

        await residence.destroy();

        res.status(200).json({ message: 'Residence deleted successfully' });
    } catch (error) {
        next(error);
    }
};