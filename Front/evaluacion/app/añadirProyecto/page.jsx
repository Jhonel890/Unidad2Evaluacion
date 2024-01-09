'use client'
import React, { useState, useEffect } from 'react';
import { ListarAutoDisp } from '@/hooks/listarAutosDisponibles';
import { estaSesion, getRol, getUser } from '@/hooks/SessionUtil';
import mensajes from '@/componentes/Mensajes';
import { ObtenerUsuarioPorCorreo } from '@/hooks/obtenerPorCorreo';
import MenuVendedor from '@/componentes/menuVendedor';
import { AgregarVenta } from '@/hooks/agregarVenta';

const CrearProyecto = () => {
    const usuario = getUser();

    const [autos, setAutos] = useState([]);
    const [selectedNumSerie, setSelectedNumSerie] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        persona: '',
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            const { nombre: fecha, nombres, apellidos, direccion, celular, cedula, external } = formData;
            const responseCorreo = await ObtenerUsuarioPorCorreo(usuario);
            const externalPersona = responseCorreo.data.external_id;

            console.log(fecha, nombres, apellidos, direccion, celular, cedula, external, externalPersona);

            const responseVenta = await AgregarVenta(
                fecha,
                nombres,
                apellidos,
                direccion,
                celular,
                cedula,
                external,
                externalPersona
            );
            console.log("Ventas de la persona", responseVenta);

            if (responseCorreo && responseVenta) {
                mensajes("Venta creada correctamente", "Correcto", "success"); // Corregido a 'success'
            } else {
                console.error('La respuesta no tiene la estructura esperada:', responseCorreo);
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    return (
        <div className="container mt-4">
            <header>
                <MenuVendedor />
            </header>
            <div>
                <h1 className="mb-2">Guardar Venta</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="numSerie">Auto:</label>
                        <select
                            id="numSerie"
                            name="numSerie"
                            className="form-control"
                            value={selectedNumSerie}
                            onChange={handleNumSerieChange}
                        >
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            type="text"
                            id="fecha"
                            name="fecha"
                            className="form-control"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombres">Nombres:</label>
                        <input
                            type="text"
                            id="nombres"
                            name="nombres"
                            className="form-control"
                            value={formData.nombres}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos:</label>
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            className="form-control"
                            value={formData.apellidos}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Direccion:</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            className="form-control"
                            value={formData.direccion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="celular">Celular:</label>
                        <input
                            type="text"
                            id="celular"
                            name="celular"
                            className="form-control"
                            value={formData.celular}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cedula">Cédula:</label>
                        <input
                            type="text"
                            id="cedula"
                            name="cedula"
                            className="form-control"
                            value={formData.cedula}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearProyecto;

