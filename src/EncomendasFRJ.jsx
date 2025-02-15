import { useState, useEffect } from "react";

const EncomendasFRJ = () => {
  const [encomendas, setEncomendas] = useState([]);
  const [nome, setNome] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [bloco, setBloco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [compartimento, setCompartimento] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const storedEncomendas = JSON.parse(localStorage.getItem("encomendas")) || [];
    setEncomendas(storedEncomendas);
  }, []);

  const salvarEncomenda = () => {
    if (!nome || !apartamento || !bloco || !descricao || !compartimento) return;

    const novaEncomenda = {
      id: Date.now(),
      nome,
      apartamento,
      bloco,
      descricao,
      compartimento,
      status: "postado",
    };

    const updatedEncomendas = [...encomendas, novaEncomenda];
    setEncomendas(updatedEncomendas);
    localStorage.setItem("encomendas", JSON.stringify(updatedEncomendas));

    setNome("");
    setApartamento("");
    setBloco("");
    setDescricao("");
    setCompartimento("");
  };

  const copiarInformacoes = (encomenda) => {
    const texto = `${encomenda.descricao} ${encomenda.compartimento}, AP${encomenda.apartamento}, Bloco ${encomenda.bloco}`;
    navigator.clipboard.writeText(texto);
  };

  const alterarStatus = (id) => {
    const updatedEncomendas = encomendas.map((enc) =>
      enc.id === id ? { ...enc, status: enc.status === "postado" ? "entregue" : "postado" } : enc
    );
    setEncomendas(updatedEncomendas);
    localStorage.setItem("encomendas", JSON.stringify(updatedEncomendas));
  };

  const apagarEncomenda = (id) => {
    const updatedEncomendas = encomendas.filter((enc) => enc.id !== id);
    setEncomendas(updatedEncomendas);
    localStorage.setItem("encomendas", JSON.stringify(updatedEncomendas));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handlePesquisaChange = (e) => {
    setPesquisa(e.target.value);
  };

  const encomendasFiltradas = encomendas.filter((enc) =>
    enc.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    enc.apartamento.toLowerCase().includes(pesquisa.toLowerCase()) ||
    enc.bloco.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // Ordenação: as postadas ficam em cima, entregues vão para baixo
  const encomendasOrdenadas = [...encomendasFiltradas].sort((a, b) => {
    if (a.status === b.status) {
      return b.id - a.id;
    }
    return a.status === "postado" ? -1 : 1;
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: darkMode ? "#121212" : "#f4f4f9", color: darkMode ? "#fff" : "#333", minHeight: "100vh", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <h1 style={{ color: "#6a1b9a", textAlign: "center", marginBottom: "20px" }}>EncomendasFRJ</h1>

      {/* Barra de pesquisa */}
      <input
        value={pesquisa}
        onChange={handlePesquisaChange}
        placeholder="Pesquisar por nome, bloco ou apartamento"
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "500px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: darkMode ? "#555" : "#fff",
          color: darkMode ? "#fff" : "#333",
          boxSizing: "border-box",
          margin: "0 auto",
        }}
      />

      {/* Botão de alternância de tema */}
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: darkMode ? "#1976d2" : "#ffb300",
          color: "#fff",
          border: "none",
          padding: "12px 15px",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          transition: "background-color 0.3s ease",
          fontSize: "18px",
        }}
      >
        {darkMode ? "🌙" : "🌞"}
      </button>

      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", backgroundColor: darkMode ? "#333" : "#ffffff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          style={{ width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: darkMode ? "#555" : "#fff", color: darkMode ? "#fff" : "#333", boxSizing: "border-box" }}
        />
        
        {/* Dois inputs lado a lado */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <input
            value={apartamento}
            onChange={(e) => setApartamento(e.target.value)}
            placeholder="Apartamento"
            style={{ width: "48%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: darkMode ? "#555" : "#fff", color: darkMode ? "#fff" : "#333" }}
          />
          <input
            value={bloco}
            onChange={(e) => setBloco(e.target.value)}
            placeholder="Bloco"
            style={{ width: "48%", padding: "12px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: darkMode ? "#555" : "#fff", color: darkMode ? "#fff" : "#333" }}
          />
        </div>

        <input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          style={{ width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: darkMode ? "#555" : "#fff", color: darkMode ? "#fff" : "#333", boxSizing: "border-box" }}
        />
        <select
          value={compartimento}
          onChange={(e) => setCompartimento(e.target.value)}
          style={{ width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: darkMode ? "#555" : "#fff", color: darkMode ? "#fff" : "#333", boxSizing: "border-box" }}
        >
          <option value="">Selecione o compartimento</option>
          {[...Array(14)].map((_, i) => (
            <option key={i} value={`c${i + 1}`}>{`C${i + 1}`}</option>
          ))}
          <option value="Fora">Fora</option>
        </select>
        <button
          onClick={salvarEncomenda}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            boxSizing: "border-box"
          }}
        >
          Salvar
        </button>
      </div>
      
      <ul style={{ marginTop: "20px", padding: "0", listStyle: "none" }}>
        {encomendasOrdenadas.map((enc) => (
          <li
            key={enc.id}
            style={{
              backgroundColor: darkMode ? "#444" : "#ffffff",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              boxSizing: "border-box"
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "16px", color: "#1976d2" }}>
              {enc.nome}
            </div>
            <div style={{ fontSize: "14px", color: darkMode ? "#bbb" : "#555", marginBottom: "5px" }}>
              <span>{enc.descricao}</span>
            </div>
            <div style={{ fontSize: "14px", color: darkMode ? "#bbb" : "#555", marginBottom: "5px" }}>
              Bloco {enc.bloco} - AP{enc.apartamento} - Compartimento {enc.compartimento}
            </div>
            <div style={{ fontSize: "14px", color: enc.status === "postado" ? "#ffb300" : "#388e3c", fontWeight: "bold", marginBottom: "10px" }}>
              Status: {enc.status}
            </div>
            <div>
              <button
                onClick={() => alterarStatus(enc.id)}
                style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                {enc.status === "postado" ? "Marcar como entregue" : "Marcar como postado"}
              </button>
              <button
                onClick={() => copiarInformacoes(enc)}
                style={{ padding: "5px 10px", backgroundColor: "#388e3c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Copiar
              </button>
              <button
                onClick={() => apagarEncomenda(enc.id)}
                style={{ marginLeft: "10px", padding: "5px 10px", backgroundColor: "#d32f2f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Apagar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EncomendasFRJ;
