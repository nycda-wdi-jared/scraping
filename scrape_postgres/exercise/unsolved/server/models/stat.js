'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define('Stat', {
    team: DataTypes.STRING,
    ppg: DataTypes.NUMERIC
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Stat;
};