'use strict';

const models = require('../models');
const { persona, cuenta, sequelize } = models;
const uuid = require('uuid');
var irradiacion = models.irradiacion;
var proyecto1 = models.proyecto;

class ConsumoControl {

    async obtener(req, res) {
        const external = req.params.external;

        try {
            const lista = await persona.findOne({
                where: { external_id: external },
                include: [
                    { model: cuenta, as: 'cuenta', attributes: ['correo'] },
                ],
                attributes: ['nombres', 'apellidos', 'direccion', 'cedula', 'external_id']
            });

            if (!lista) {
                res.status(404);
                return res.json({ message: "Recurso no encontrado", code: 404, data: {} });
            }

            res.status(200);
            res.json({ message: "Éxito", code: 200, data: lista });
        } catch (error) {
            res.status(500);
            res.json({ message: "Error interno del servidor", code: 500, error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const lista = await persona.findAll({
                include: [
                    { model: cuenta, as: 'cuenta', attributes: ['correo'] },
                ],
                attributes: ['nombres', 'apellidos', 'direccion', 'cedula', 'external_id']
            });

            res.status(200);
            res.json({ message: "Éxito", code: 200, data: lista });
        } catch (error) {
            res.status(500);
            res.json({ message: "Error interno del servidor", code: 500, error: error.message });
        }
    }

    async guardar(req, res) {
        const { nombre, fecha, consumoConvencional, consumoEnergiaLimpia, proyecto } = req.body;
        if (nombre && fecha && consumoConvencional && consumoEnergiaLimpia && proyecto) {
            try {

                const proA = await proyecto1.findOne({
                    where: { external_id: req.body.proyecto },
                });

                if (!proA) {
                    return res.status(401).json({ msg: "ERROR", tag: "No se encuentra la persona", code: 401 });
                }

                const data = {
                    nombre: req.body.nombre,
                    fecha: req.body.fecha,
                    consumoConvencional: req.body.consumoConvencional,
                    consumoEnergiaLimpia: req.body.consumoEnergiaLimpia,
                    IDProyecto: proA.id
                };

                const transaction = await sequelize.transaction();

                try {
                    const result = await irradiacion.create(data, transaction);

                    await transaction.commit();

                    if (!result) {
                        res.status(401);
                        return res.json({ message: "No se pudo crear la irradiacion", tag: "No se puede crear", code: 401 });
                    }

                    res.status(200);
                    res.json({ message: "Éxito", code: 200 });
                } catch (error) {
                    await transaction.rollback();
                    res.status(203);
                    res.json({ message: "Error de procesamiento", code: 203, error: error.message });
                }
            } catch (error) {
                res.status(500);
                res.json({ message: "Error interno del servidor", code: 500, error: error.message });
            }
        } else {
            res.status(400);
            res.json({ message: "Error de solicitud", tag: "Datos incorrectos", code: 400 });
        }
    }

    async modificar(req, res) {
        if (
            req.body.hasOwnProperty('nombres') &&
            req.body.hasOwnProperty('apellidos') &&
            req.body.hasOwnProperty('cedula') &&
            req.body.hasOwnProperty('direccion') &&
            req.body.hasOwnProperty('correo') &&
            req.body.hasOwnProperty('clave')
        ) {
            const external = req.params.external;

            try {
                const personaA = await persona.findOne({ where: { external_id: external }, include: [{ model: cuenta, as: 'cuenta' }] });

                if (!personaA) {
                    res.status(404);
                    return res.json({ msg: "ERROR", tag: "Registro no encontrado", code: 404 });
                }


                const data = {
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    cedula: req.body.cedula,
                    direccion: req.body.direccion,
                    cuenta: {
                        correo: req.body.correo,
                        clave: req.body.clave,
                    },
                };

                const transaction = await models.sequelize.transaction();

                try {
                    // Verificar si personaA.cuenta existe antes de intentar actualizar
                    if (personaA.cuenta) {
                        await personaA.cuenta.update({
                            correo: req.body.correo,
                            clave: req.body.clave,
                        }, { transaction });
                    }

                    await personaA.update(data, {
                        include: [{ model: models.cuenta, as: "cuenta" }],
                        transaction,
                    });

                    await transaction.commit();

                    res.status(200);
                    res.json({ msg: "OK", code: 200 });

                } catch (error) {
                    if (transaction) await transaction.rollback();

                    res.status(203);
                    res.json({ msg: "ERROR", code: 203, error_msg: error.message });
                }

            } catch (error) {
                res.status(500);
                res.json({ msg: "ERROR", code: 500, error_msg: error.message });
            }
        } else {
            res.status(400);
            res.json({ msg: "ERROR", tag: "Datos incorrectos", code: 400 });
        }
    }


}

module.exports = ConsumoControl;
