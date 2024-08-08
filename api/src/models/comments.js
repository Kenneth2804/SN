const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('comments', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
        mentionedUsers: {
            type: DataTypes.JSON,  
            allowNull: true,
        },
        to: {
            type: DataTypes.STRING,  
            allowNull: true,
            defaultValue: "Anonimo"
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
