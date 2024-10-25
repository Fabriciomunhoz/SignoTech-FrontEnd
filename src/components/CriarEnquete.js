import React, { useState, useEffect } from 'react';
import { criarEnquete } from '../api';
import { useNavigate } from 'react-router-dom';
import './CSS/CriarEnquete.css';

const CriarEnquete = () => {
    const [titulo, setTitulo] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [opcoes, setOpcoes] = useState([{ texto: '' }]);
    const navigate = useNavigate();

    useEffect(() => {
        const hoje = new Date().toISOString().split('T')[0];
        setDataInicio(hoje);
    }, []);

    const handleAddOption = () => {
        setOpcoes([...opcoes, { texto: '' }]);
    };

    const handleOptionChange = (index, value) => {
        const newOpcoes = [...opcoes];
        newOpcoes[index].texto = value;
        setOpcoes(newOpcoes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enquete = { titulo, data_inicio: dataInicio, data_final: dataFinal, opcoes };

        await criarEnquete(enquete);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="criar-enquete-form">
            <h2>Criar Nova Enquete</h2>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Data de Início"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Data de Término"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                required
            />
            {opcoes.map((opcao, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Opção ${index + 1}`}
                    value={opcao.texto}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                />
            ))}
            <button type="button" onClick={handleAddOption}>Adicionar Opção</button>
            <button type="submit">Criar Enquete</button>
        </form>
    );
};

export default CriarEnquete;
