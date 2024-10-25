import React, { useEffect, useState } from 'react';
import { obterEnquete, votar, excluirEnquete } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import './CSS/EnqueteDetalhe.css';

const EnqueteDetalhe = () => {
    const { id } = useParams();
    const [enquete, setEnquete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnquete = async () => {
            try {
                const data = await obterEnquete(id);
                setEnquete(data);
            } catch (err) {
                setError('Erro ao carregar detalhes da enquete');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEnquete();
    }, [id]);

    const handleVote = async (opcaoId) => {
        try {
            await votar(id, { id: opcaoId });
            const updatedEnquete = await obterEnquete(id);
            setEnquete(updatedEnquete);
        } catch (err) {
            setError('Erro ao votar');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await excluirEnquete(id);
            navigate('/');
        } catch (err) {
            setError('Erro ao excluir a enquete');
            console.error(err);
        }
    };

    const handleEdit = () => {
        navigate(`/enquetes/${id}/editar`);
    };

    // Verificar se a votação ainda é permitida
    const isVotingAllowed = () => {
        if (!enquete || !enquete.data_final) return false;
        const now = new Date();
        const dataFinal = new Date(enquete.data_final);
        return now < dataFinal;
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    if (!enquete || !enquete.opcoes) {
        return <p>Não há opções disponíveis.</p>;
    }

    return (
        <div className="container">
            <h2>{enquete.titulo}</h2>
            <hr />
            <h3>Opções de Voto:</h3>
            <ul>
                {enquete.opcoes.map((opcao) => (
                    <li key={opcao.id}>
                        {opcao.texto} - Votos: {opcao.votos}
                        {isVotingAllowed() ? (
                            <button onClick={() => handleVote(opcao.id)}>Votar</button>
                        ) : (
                            <span className="votacao-encerrada">Votação encerrada</span>
                        )}
                    </li>
                ))}
            </ul>
            <hr />
            <div className="button-wrapper">
                <button onClick={handleDelete}>Excluir Enquete</button>
                <button onClick={handleEdit}>Editar Enquete</button>
            </div>
        </div>
    );
};
export default EnqueteDetalhe;
