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
        defaultValue: 'pending', // statuses could be 'pending', 'accepted', 'declined'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    residenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Residence,
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'applications',
});

Application.belongsTo(Residence, { foreignKey: 'residenceId' });
Application.belongsTo(User, { foreignKey: 'userId' });

export default Application;