const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('token', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\w{3,}$/,
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  });
};
