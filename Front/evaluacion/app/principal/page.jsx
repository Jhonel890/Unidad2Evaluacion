"use client"
import React, { useEffect, useState } from 'react';
import { ListarAuto } from "@/hooks/listaAutos";
import Menu from '@/componentes/menu';

const Page = () => {



    const [proyectos, setProyectos] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListarAuto();

                if (response && response.data && Array.isArray(response.data)) {
                    setProyectos(response.data);
                    console.log(response.data);
                } else {
                    console.error('La respuesta de ListarAuto no tiene la estructura esperada:', response);
                }
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleButtonClick = (proyecto) => {
        console.log('Información del proyecto:', proyecto);
    };

    return (
        <div>
            <p></p>
            <header>
                <Menu></Menu>
            </header>
            <div className="container mt-5">
                <h1>Lista de proyectos</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.map((proyecto, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{proyecto.nombre}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => handleButtonClick(auto)}
                                    >
                                        Añadir Imagen
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Page;
