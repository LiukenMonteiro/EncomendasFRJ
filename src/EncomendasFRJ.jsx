import { useState, useEffect } from "react";
import './App.css';

// Componente para o formulário de encomendas
const EncomendaForm = ({ darkMode, onSave }) => {
  const [formData, setFormData] = useState({
    nome: "",
    apartamento: "",
    bloco: "",
    descricao: "",
    compartimento: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (Object.values(formData).some(val => !val)) return;
    onSave(formData);
    setFormData({
      nome: "",
      apartamento: "",
      bloco: "",
      descricao: "",
      compartimento: ""
    });
  };

  return (
    <>
      <h2 className="form-heading form-heading-encomendas">Registrar Encomenda</h2>
      <input
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        placeholder="Nome"
        className={`form-input ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
      />
      <div className="input-group">
        <input
          name="apartamento"
          value={formData.apartamento}
          onChange={handleChange}
          placeholder="Apartamento"
          className={`input-group-item ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
        />
        <input
          name="bloco"
          value={formData.bloco}
          onChange={handleChange}
          placeholder="Bloco"
          className={`input-group-item ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
        />
      </div>
      <input
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        placeholder="Descrição"
        className={`form-input ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
      />
      <select
        name="compartimento"
        value={formData.compartimento}
        onChange={handleChange}
        className={`form-input ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
      >
        <option value="">Selecione o compartimento</option>
        {[...Array(14)].map((_, i) => (
          <option key={i} value={`C${i + 1}`}>{`C${i + 1}`}</option>
        ))}
        <option value="Fora">Fora</option>
      </select>
      <button onClick={handleSubmit} className="submit-button submit-button-encomendas">
        Salvar
      </button>
    </>
  );
};

// Componente para o formulário de envelopes
const EnvelopeForm = ({ darkMode, onSave }) => {
  const [formData, setFormData] = useState({
    nome: "",
    apartamento: "",
    bloco: "",
    descricao: "",
    compartimento: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (Object.values(formData).some(val => !val)) return;
    onSave(formData);
    setFormData({
      nome: "",
      apartamento: "",
      bloco: "",
      descricao: "",
      compartimento: ""
    });
  };

  return (
    <>
      <h2 className="form-heading form-heading-envelopes">Registrar Envelope</h2>
      <input
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        placeholder="Nome"
        className={`form-input ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
      />
      <div className="input-group">
        <input
          name="apartamento"
          value={formData.apartamento}
          onChange={handleChange}
          placeholder="Apartamento"
          className={`input-group-item ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
        />
        <input
          name="bloco"
          value={formData.bloco}
          onChange={handleChange}
          placeholder="Bloco"
          className={`input-group-item ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
        />
      </div>
      <input
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        placeholder="Descrição"
        className={`form-input ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
      />
      <select
        name="compartimento"
        value={formData.compartimento}
        onChange={handleChange}
        className={`form-input ${darkMode ? 'form-input-dark' : 'form-input-light'}`}
      >
        <option value="">Selecione o compartimento</option>
        {Array.from({ length: 18 }, (_, i) => String.fromCharCode(65 + i)).map(letter => (
          <option key={letter} value={letter}>{letter}</option>
        ))}
      </select>
      <button onClick={handleSubmit} className="submit-button submit-button-envelopes">
        Salvar
      </button>
    </>
  );
};

// Componente principal
const EncomendasFRJ = () => {
  const [activeTab, setActiveTab] = useState("encomendas");
  const [darkMode, setDarkMode] = useState(() => {
    // Recupera o tema salvo no localStorage ou usa "light" como padrão
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });
  const [pesquisa, setPesquisa] = useState("");
  const [encomendas, setEncomendas] = useState([]);
  const [envelopes, setEnvelopes] = useState([]);

  useEffect(() => {
    // Salva o tema no localStorage sempre que ele mudar
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    setEncomendas(JSON.parse(localStorage.getItem("encomendas")) || []);
    setEnvelopes(JSON.parse(localStorage.getItem("envelopes")) || []);
  }, []);

  const salvarEncomenda = (formData) => {
    const novaEncomenda = { ...formData, id: Date.now(), status: "postado" };
    const updatedEncomendas = [...encomendas, novaEncomenda];
    setEncomendas(updatedEncomendas);
    localStorage.setItem("encomendas", JSON.stringify(updatedEncomendas));
  };

  const salvarEnvelope = (formData) => {
    const novoEnvelope = { ...formData, id: Date.now(), status: "postado" };
    const updatedEnvelopes = [...envelopes, novoEnvelope];
    setEnvelopes(updatedEnvelopes);
    localStorage.setItem("envelopes", JSON.stringify(updatedEnvelopes));
  };

  const alterarStatus = (id, isEnvelope) => {
    const updateItems = (items) =>
      items.map(item =>
        item.id === id ? { ...item, status: item.status === "postado" ? "entregue" : "postado" } : item
      );

    if (isEnvelope) {
      const updated = updateItems(envelopes);
      setEnvelopes(updated);
      localStorage.setItem("envelopes", JSON.stringify(updated));
    } else {
      const updated = updateItems(encomendas);
      setEncomendas(updated);
      localStorage.setItem("encomendas", JSON.stringify(updated));
    }
  };

  const apagarItem = (id, isEnvelope) => {
    if (isEnvelope) {
      const updated = envelopes.filter(env => env.id !== id);
      setEnvelopes(updated);
      localStorage.setItem("envelopes", JSON.stringify(updated));
    } else {
      const updated = encomendas.filter(enc => enc.id !== id);
      setEncomendas(updated);
      localStorage.setItem("encomendas", JSON.stringify(updated));
    }
  };

  const copiarInformacoes = (item, isEnvelope) => {
    const texto = `Nome: ${item.nome}\nDescrição: ${item.descricao}\nAP: ${item.apartamento}\nBloco: ${item.bloco}${item.compartimento ? "\nCompartimento: " + item.compartimento : ""}`;
    navigator.clipboard.writeText(texto);
  };

  const filtrarItens = (items) => {
    const filtered = items.filter(item => {
      const searchFields = [item.nome, item.apartamento, item.bloco];
      return searchFields.some(field =>
        field.toLowerCase().includes(pesquisa.toLowerCase())
      );
    });
    return filtered.sort((a, b) => {
      if (a.status === b.status) return b.id - a.id;
      return a.status === "postado" ? -1 : 1;
    });
  };

  return (
    <div className={`container ${darkMode ? 'container-dark' : 'container-light'}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`theme-toggle ${darkMode ? 'theme-toggle-dark' : 'theme-toggle-light'}`}
      >
        {darkMode ? "🌙" : "🌞"}
      </button>

      <div className="tab-container">
        <button
          onClick={() => setActiveTab("encomendas")}
          className={`tab-button ${activeTab === "encomendas" ? 'tab-button-encomendas' : 'tab-button-encomendas-inactive'}`}
        >
          Encomendas
        </button>
        <button
          onClick={() => setActiveTab("envelopes")}
          className={`tab-button ${activeTab === "envelopes" ? 'tab-button-envelopes' : 'tab-button-envelopes-inactive'}`}
        >
          Envelopes
        </button>
      </div>

      <input
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        placeholder="Pesquisar por nome, apartamento ou bloco"
        className={`search-input ${darkMode ? 'search-input-dark' : 'search-input-light'}`}
      />

      <div className="slider-container">
        <div className={`slider-content ${activeTab === "encomendas" ? 'slider-content-encomendas' : 'slider-content-envelopes'}`}>
          <div className={`form-container ${darkMode ? 'form-container-dark' : 'form-container-light'}`}>
            <EncomendaForm darkMode={darkMode} onSave={salvarEncomenda} />
            <ul className="item-list">
              {filtrarItens(encomendas).map(item => (
                <li key={item.id} className={`item-card ${darkMode ? 'item-card-dark' : 'item-card-light'}`}>
                  <div className="item-title item-title-encomendas">{item.nome}</div>
                  <div className={`item-description ${darkMode ? 'item-description-dark' : 'item-description-light'}`}>
                    {item.descricao}
                  </div>
                  <div className={`item-description ${darkMode ? 'item-description-dark' : 'item-description-light'}`}>
                    Bloco {item.bloco} - AP{item.apartamento} - Compartimento {item.compartimento}
                  </div>
                  <div className={`item-status ${item.status === "postado" ? 'item-status-posted' : 'item-status-delivered'}`}>
                    {item.status === "entregue" && <span className="status-indicator"></span>}
                    Status: {item.status}
                  </div>
                  <div>
                    <button
                      onClick={() => alterarStatus(item.id, false)}
                      className={`action-button ${item.status === "entregue" ? "action-button-delivered" : "action-button-status-encomendas"}`}
                    >
                      {item.status === "postado" ? "Marcar como entregue" : "Marcar como postado"}
                    </button>
                    <button onClick={() => copiarInformacoes(item, false)} className="action-button action-button-copy">
                      Copiar
                    </button>
                    <button onClick={() => apagarItem(item.id, false)} className="action-button action-button-delete">
                      Apagar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={`form-container ${darkMode ? 'form-container-dark' : 'form-container-light'}`}>
            <EnvelopeForm darkMode={darkMode} onSave={salvarEnvelope} />
            <ul className="item-list">
              {filtrarItens(envelopes).map(item => (
                <li key={item.id} className={`item-card ${darkMode ? 'item-card-dark' : 'item-card-light'}`}>
                  <div className="item-title item-title-envelopes">{item.nome}</div>
                  <div className={`item-description ${darkMode ? 'item-description-dark' : 'item-description-light'}`}>
                    {item.descricao}
                  </div>
                  <div className={`item-description ${darkMode ? 'item-description-dark' : 'item-description-light'}`}>
                    Bloco {item.bloco} - AP{item.apartamento} - Compartimento {item.compartimento}
                  </div>
                  <div className={`item-status ${item.status === "postado" ? 'item-status-posted' : 'item-status-delivered'}`}>
                    {item.status === "entregue" && <span className="status-indicator"></span>}
                    Status: {item.status}
                  </div>
                  <div>
                    <button
                      onClick={() => alterarStatus(item.id, true)}
                      className={`action-button ${item.status === "entregue" ? "action-button-delivered" : "action-button-status-envelopes"}`}
                    >
                      {item.status === "postado" ? "Marcar como entregue" : "Marcar como postado"}
                    </button>
                    <button onClick={() => copiarInformacoes(item, true)} className="action-button action-button-copy">
                      Copiar
                    </button>
                    <button onClick={() => apagarItem(item.id, true)} className="action-button action-button-delete">
                      Apagar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncomendasFRJ;