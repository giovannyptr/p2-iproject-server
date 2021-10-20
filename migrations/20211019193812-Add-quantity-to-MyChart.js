'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'MyCarts',
      'quantity',
      {
        type: Sequelize.INTEGER,
      },
      {
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'MyCarts',
      'quantity',
      {}
    );
  }
};
