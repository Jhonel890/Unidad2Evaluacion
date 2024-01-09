"use strict";

module.exports = (sequelize, DataTypes) => {
    const proyecto = sequelize.define('proyecto', {
        nombre: { type: DataTypes.STRING(150), defaultValue: "NONE" },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 }
    }, { freezeTableName: true });

    proyecto.associate = function (models) {
        proyecto.hasMany(models.consumo, { foreignKey: 'IDProyecto', as: 'consumo' });
        proyecto.belongsTo(models.persona, {
            foreignKey: 'id_persona'
        });
    };

    return proyecto;
};
