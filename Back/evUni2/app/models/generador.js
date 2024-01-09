"use strict";

module.exports = (sequelize, DataTypes) => {
    const generador = sequelize.define('generador', {
        eficiencia: { type: DataTypes.STRING(150), defaultValue: "NONE" },
        kilovatiosGenerados: { type: DataTypes.STRING(150), defaultValue: "NONE" },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 }
    }, { freezeTableName: true });

    generador.associate = function (models) {
        generador.belongsTo(models.proyecto, { foreignKey: 'IDProyecto', as: 'proyecto' });
        // Ajusta 'IDProyecto' según tu estructura de base de datos
    };

    return generador;
};
