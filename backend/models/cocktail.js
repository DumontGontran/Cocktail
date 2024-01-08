const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return Cocktail = sequelize.define('Cocktail', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        nom:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        recette:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    })
}