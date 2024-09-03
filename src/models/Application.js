// src/models/Application.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Residence from './Residence.js';
import User from './User.js';

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
    residenceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Residence,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    // Add more fields if needed
}, {
    timestamps: true,
});

// Associations
Application.belongsTo(Residence, { foreignKey: 'residenceId' });
Application.belongsTo(User, { foreignKey: 'userId' });

export default Application;