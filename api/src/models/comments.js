const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('comments', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID v4
            allowNull: false,
            primaryKey: true
        },
        texto: {
            type: DataTypes.TEXT,
            allowNull: true 
        },
        audioFilePath: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });
};
