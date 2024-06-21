const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('comments', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true
        },
     
        texto:{
           type: DataTypes.TEXT,
           allowNull: true 
        },
        audioFilePath: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    })
}