'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
      allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},    
    age: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    phone: {
      type: DataTypes.BIGINT(20),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

// module.exports = User;