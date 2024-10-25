import React, { useEffect, useState } from 'react';
import { listarEnquetes } from '../api';
import { Link } from 'react-router-dom';
import './CSS/EnqueteList.css';

const EnqueteList = () => {
    const [enquetes, setEnquetes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchEnquetes = async () => {
            try {
                const data = await listarEnquetes();
                setEnquetes(data);
            } catch (err) {
                setError('Erro ao carregar enquetes');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEnquetes();
    }, []);
    if (loading) return <p className="loading">Carregando...</p>;
    if (error) return <p className="error">{error}</p>;
    const calcularTempoRestante = (dataFinal) => {
        const agora = new Date();
        const dataTermino = new Date(dataFinal);
        const diferencaEmMs = dataTermino - agora;
        if (diferencaEmMs < 0) return 'Enquete encerrada';
        const diasRestantes = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24));
        const horasRestantes = Math.floor((diferencaEmMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (diasRestantes > 0) {
            return `${diasRestantes} dias e ${horasRestantes} horas restantes`;
        } else {
            return `${horasRestantes} horas restantes`;
        }
    };
    return (
        <div className="container">
            <h2 className="enquetes-title">Enquetes</h2>
            <ul className="enquete-list">
                {enquetes.map((enquete) => (
                    <Link to={`/enquetes/${enquete.id}`} key={enquete.id} className="enquete-item">
                        <li className="enquete-card">
                            <div className="enquete-title">{enquete.titulo}</div>
                            <div className="enquete-date">
                                Data final: {new Date(enquete.data_final).toLocaleDateString()}
                            </div>
                            <div className="enquete-time-left">
                                {calcularTempoRestante(enquete.data_final)}
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
            <Link to="/criar-enquete">
                <button className="button">Criar nova enquete</button>
            </Link>
        </div>
    );
};
export default EnqueteList;
