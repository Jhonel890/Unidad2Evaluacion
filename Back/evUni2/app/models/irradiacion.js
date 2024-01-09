"use strict";

module.exports = (sequelize, DataTypes) => {
    const irradiacion = sequelize.define('irradiacion', {
        mes: { type: DataTypes.STRING(150), defaultValue: "NONE" },
        valorIrraciacion: { type: DataTypes.STRING(150), defaultValue: "NONE" },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 }
    }, { freezeTableName: true });

    irradiacion.associate = function (models) {
        irradiacion.belongsTo(models.proyecto, { foreignKey: 'IDProyecto', as: 'proyecto' });
    };

    return irradiacion;
};
