"use strict";

module.exports = (sequelize, DataTypes) => {
    const consumo = sequelize.define('consumo', {
        nombre: { type: DataTypes.STRING(150), defaultValue: "NONE" },
        fecha: {
            type: DataTypes.DATEONLY,
        },
        consumoConvencional: { type: DataTypes.STRING(150), defaultValue: "NONE" },
        consumoEnergiaLimpia: { type: DataTypes.STRING(150), defaultValue: "NONE" },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 }
    }, { freezeTableName: true });

    consumo.associate = function (models) {
        consumo.belongsTo(models.proyecto, { foreignKey: 'IDProyecto', as: 'proyecto' });
        // Ajusta 'IDProyecto' según tu estructura de base de datos
    };

    return consumo;
};
