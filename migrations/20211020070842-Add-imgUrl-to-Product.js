'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Products',
      'img_url',
      {
        type: Sequelize.STRING,
      },
      {
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Products',
      'img_url',
      {}
    )
    }
};
