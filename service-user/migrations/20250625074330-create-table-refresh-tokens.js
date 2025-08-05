'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('refresh_tokens', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        token: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        user_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users', // Name of the table to reference
            key: 'id' // Column in the referenced table
          },
          onDelete: 'CASCADE', // Optional: define behavior on delete
          onUpdate: 'CASCADE' // Optional: define behavior on update
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });

      await queryInterface.addIndex('refresh_tokens', {
        type: "foreign_key",
        name: 'fk_refresh_tokens_users',
        fields: ['user_id'],
        references: {
          table: 'users',
          field: 'id'
        }
      })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('refresh_tokens');
  }
};
