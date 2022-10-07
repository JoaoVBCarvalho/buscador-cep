import { useState } from 'react';
import { GoSearch } from "react-icons/go";
import "./styles.css";
import api from "./services/api";

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //01310930/json
    if(input === '') { 
      alert('Preencha o campo com algum CEP');
      return;
    } 

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch {
      alert('Erro ao buscar');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title" > Buscador de CEP </h1>

    <div className="containerInput">
      <input 
        type="text" 
        placeholder="Digite um CEP..."
        value = {input}
        onChange = { (event) => setInput(event.target.value) }
      />

      <button className="searchButton" onClick={handleSearch}>
        <GoSearch size={25} color="#000" />
      </button>

    </div>


    {Object.keys(cep).length > 0 && (
       <main className="main">
       <h2> CEP: {cep.cep} </h2>
 
       <span> CEP: {cep.logradouro} </span>
       <span> Complemento: {cep.complemento} </span>
       <span> Bairro: {cep.bairro} </span>
       <span> Localidade: {cep.localidade} - {cep.uf} </span> 
     </main>
    )}
   
    
 </div>
  );
}

export default App;
