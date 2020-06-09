'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Posts', // name of Source model
      'User_userID', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Posts', // name of Source model
      'User_userID' // key we want to remove
    );
  }
};