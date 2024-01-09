import { getToken } from "./SessionUtil";

export async function ListarAuto() {
    const token = getToken();

    try {
        const response = await fetch('http://localhost:3000/evaluacion/listar/proyecto', {
            headers: {
                'TEST-KEY': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud GET: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        //console.log(data);
        return data;
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
        throw error;
    }
}
