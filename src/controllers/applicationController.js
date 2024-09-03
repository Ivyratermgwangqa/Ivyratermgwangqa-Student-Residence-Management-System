// src/controllers/applicationController.js
import Application from '../models/Application.js';
import Residence from '../models/Residence.js';

// Create a new application
export const createApplication = async (req, res, next) => {
    const { residenceId } = req.body;
    try {
        const residence = await Residence.findByPk(residenceId);
        if (!residence) {
            return res.status(404).json({ message: 'Residence not found' });
        }

        const newApplication = await Application.create({
            residenceId,
            userId: req.user.id,
            status: 'pending',
        });

        res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (error) {
        next(error);
    }
};

// Get all applications for a specific user
export const getUserApplications = async (req, res, next) => {
    try {
        const applications = await Application.findAll({ where: { userId: req.user.id } });

        res.status(200).json({ applications });
    } catch (error) {
        next(error);
    }
};

// Get all applications for a specific residence
export const getResidenceApplications = async (req, res, next) => {
    const { residenceId } = req.params;
    try {
        const applications = await Application.findAll({ where: { residenceId } });

        res.status(200).json({ applications });
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