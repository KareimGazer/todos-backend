const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        // Create todos table after users table
        await queryInterface.createTable('todos', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'updated_at'
            }
        });
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('todos');
    },
};
