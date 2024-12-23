const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'https://i.pinimg.com/originals/07/66/d1/0766d183119ff92920403eb7ae566a85.png',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    originCountry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    originCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.User, {
      through: models.Follow,
      as: 'followers',
      foreignKey: 'followingId',
      otherKey: 'followerId',
    });
    User.belongsToMany(models.User, {
      through: models.Follow,
      as: 'following',
      foreignKey: 'followerId',
      otherKey: 'followingId',
    });
  };

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
