const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Follow = sequelize.define('follow', {
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, { as: 'follower', foreignKey: 'followerId' });
    Follow.belongsTo(models.User, { as: 'following', foreignKey: 'followingId' });
  };
  return Follow;
};
