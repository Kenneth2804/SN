const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('voice', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        voiceNoteUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
}