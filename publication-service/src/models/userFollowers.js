module.exports = (sequelize, DataTypes) => {
  const UserFollowers = sequelize.define('userFollowers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateOnFollow: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  return UserFollowers;
};
