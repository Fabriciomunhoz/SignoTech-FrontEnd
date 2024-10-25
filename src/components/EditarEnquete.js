import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obterEnquete, editarEnquete } from "../api";
import "./CSS/EditarEnquete.css";

const EditarEnquete = () => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [data_inicio, setDataInicio] = useState("");
  const [data_final, setDataFinal] = useState("");
  const [opcoes, setOpcoes] = useState(["", "", ""]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnquete = async () => {
      const data = await obterEnquete(id);
      setTitulo(data.titulo);
      setDataInicio(formatDate(data.data_inicio));
      setDataFinal(formatDate(data.data_final));
      setOpcoes(data.opcoes.map((opcao) => opcao.texto));
    };

    fetchEnquete();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleOptionChange = (index, value) => {
    const newOpcoes = [...opcoes];
    newOpcoes[index] = value;
    setOpcoes(newOpcoes);
  };

  const adicionarOpcao = () => {
    setOpcoes([...opcoes, ""]);
  };

  const removerOpcao = (index) => {
    const newOpcoes = opcoes.filter((_, i) => i !== index);
    setOpcoes(newOpcoes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enquete = { titulo, data_inicio, data_final, opcoes };
    await editarEnquete(id, enquete);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h1>Editar Enquete</h1>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        type="date"
        value={data_inicio}
        onChange={(e) => setDataInicio(e.target.value)}
        required
      />
      <input
        type="date"
        value={data_final}
        onChange={(e) => setDataFinal(e.target.value)}
        required
      />
      {opcoes.map((opcao, index) => (
        <div key={index} className="opcao-container">
          <input
            type="text"
            value={opcao}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Opção ${index + 1}`}
            required
          />
          <button
            type="button"
            onClick={() => removerOpcao(index)}
            className="remover-opcao"
          >
            Remover
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={adicionarOpcao}
        className="adicionar-opcao"
      >
        Adicionar Opção
      </button>
      <button type="submit">Salvar Alterações</button>
    </form>
  );
};

export default EditarEnquete;
