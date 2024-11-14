const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Todo extends Model {}
Todo.init({
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
        }
    }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'todo'
})

module.exports = Todo
