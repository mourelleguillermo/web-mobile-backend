'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Post, { foreignKey: 'userId' });
  };

  return User;
};
