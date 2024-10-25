import axios from 'axios';
const BASE_URL = 'http://localhost:3000/enquetes';
export const listarEnquetes = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};
export const obterEnquete = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};
export const criarEnquete = async (enquete) => {
    const response = await axios.post(BASE_URL, enquete);
    return response.data;
};
export const votar = async (id, opcao) => {
    const response = await axios.post(`${BASE_URL}/${id}/votar`, opcao);
    return response.data;
};
export const excluirEnquete = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};
export const editarEnquete = async (id, enquete) => {
    try {
        const response = await fetch(`http://localhost:3000/enquetes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(enquete),
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar a enquete');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};
