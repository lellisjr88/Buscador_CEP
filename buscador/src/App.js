import {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import './styles.css'

import api from './services/api.js'

function App() {

  {/*Pegar os dados do usuário no input*/}
  const [input,setInput] = useState('')

  {/*Pegar os dados da api e renderizar na tela do usuário*/}
  const [cep, setCep] = useState({})

  {/*Verificação para saber se o usuário digitou algo no input e consumo da api*/}
  async function handleSearch() {
    if (input === "") {
      alert('Preencha algum CEP!')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
      
    } catch (error) {
      alert('Ops, erro ao buscar!')
      setInput("")
    }

  }

  return (
    <div className="container">
     <h1 className="title">Buscador de CEP</h1>
     <div className="containerInput">
      <input 
        type="text"
        placeholder="Digite um CEP para buscar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color='#FFF'></FiSearch>
      </button>

     </div>

     {Object.keys(cep).length > 0 && (
          <main className="main"> 
            <h2>CEP: {cep.cep}</h2>
    
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade} - Estado: {cep.uf}</span>
         </main>
     )}
 
    </div>
  );
}

export default App;
