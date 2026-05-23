import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FormularioDeTarefa from './components/FormularioDeTarefa';
import TodasAsTarefas from './pages/TodasAsTarefas';
import TarefasPendentes from './pages/TarefasPendentes';
import TarefasConcluidas from './pages/TarefasConcluidas';
import Uninassau from './pages/uninassau';
import './index.css';

function App() {

  const [tarefas, setTarefas] = useState([]);

  useEffect(
    () => {
      const fetchTarefas = async () => {
        try {
          const response = await fetch('http://localhost:3000/tarefas');
          if (!response.ok) {
            throw new Error('Erro ao carregar as tarefas da API.');
          }
          const data = await response.json();
          const tarefasFormatadas = data.map(t => ({
            id: t.id, 
            texto: t.texto,
            concluida: t.concluida
          }));
          setTarefas(tarefasFormatadas);
        }catch (error) {
          console.error("Falha ao buscar tarefas:", error);
        }
      };
      fetchTarefas();
    } , []
  )

  // ======================================================
  // Adicionar Tarefa com POST para a API
  // ======================================================
  const adicionarTarefa = async (texto) => {
    try {
        const response = await fetch('http://localhost:3000/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Envia o texto da nova tarefa no corpo da requisição
            body: JSON.stringify({ texto }),
        });

        if (!response.ok) {
            throw new Error('Falha ao adicionar tarefa na API.');
        }

        // Recebe a tarefa completa (incluindo o _id gerado pela API)
        const novaTarefaAPI = await response.json();
        
        // Formata a tarefa recebida (de _id para id)
        const novaTarefaLocal = {
            id: novaTarefaAPI.id, 
            texto: novaTarefaAPI.texto,
            concluida: novaTarefaAPI.concluida
        };

        // Adiciona a tarefa (com o ID correto da API) ao estado local
        setTarefas([...tarefas, novaTarefaLocal]);

    } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
    }
  };

/*
  useEffect(
    () => { 
      const fetchTarefas = async () => {
        try {
          const response = await fetch('http://localhost:3000/tarefas');
          if (!response.ok) {
            throw new Error('Erro ao carregar as tarefas da API.');
          }
          const data = await response.json();
          const tarefasFormatadas = data.map(t => ({
            id: t.id, 
            texto: t.texto,
            concluida: t.concluida
          }));
          setTarefas(tarefasFormatadas);
        }
        catch (error) {
          console.error("Falha ao buscar tarefas:", error);
        }
      };
      fetchTarefas();
    } , []

  );

  const adicionarTarefa = async (texto) => {
      try {
        const response = await fetch('http://localhost:3000/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texto }),
        });
        if (!response.ok) {
            throw new Error('Falha ao adicionar tarefa na API.');
        }
        const novaTarefaAPI = await response.json();
        const novaTarefaLocal = {
            id: novaTarefaAPI.id, 
            texto: novaTarefaAPI.texto,
            concluida: novaTarefaAPI.concluida
        }; 
        setTarefas([...tarefas, novaTarefaLocal]);
      }
      catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
  }

  const removerTarefa =  (id) => {
    try {
        const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
             // Se o DELETE na API for bem-sucedido (status 204), atualiza o estado local
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
        } else if (response.status === 404) {
            console.warn("Tarefa não encontrada na API, removendo apenas localmente.");
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
        } else {
             throw new Error('Falha ao remover tarefa na API.');
        }

    } catch (error) {
        console.error("Erro ao remover tarefa:", error);
    }
  };

  /*
  // LÓGICA PARA CARREGAR TAREFAS DA API NO INÍCIO
  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        // MUDE ESTE ENDEREÇO SE SUA API ESTIVER EM UMA PORTA DIFERENTE
        const response = await fetch('http://localhost:3000/tarefas');

        if (!response.ok) {
          throw new Error('Erro ao carregar as tarefas da API.');
        }

        const data = await response.json();
        
        // Mapeia o campo _id do MongoDB para o campo id do React.
        // O restante do sistema usa 'id' para alternar/remover.
        const tarefasFormatadas = data.map(t => ({
          id: t.id, 
          texto: t.texto,
          concluida: t.concluida
        }));
        
        setTarefas(tarefasFormatadas);

      } catch (error) {
        console.error("Falha ao buscar tarefas:", error);
      }
    };

    fetchTarefas();
  }, []);


  // ======================================================
  // Adicionar Tarefa com POST para a API
  // ======================================================
  const adicionarTarefa = async (texto) => {
    try {
        const response = await fetch('http://localhost:3000/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Envia o texto da nova tarefa no corpo da requisição
            body: JSON.stringify({ texto }),
        });

        if (!response.ok) {
            throw new Error('Falha ao adicionar tarefa na API.');
        }

        // Recebe a tarefa completa (incluindo o _id gerado pela API)
        const novaTarefaAPI = await response.json();
        
        // Formata a tarefa recebida (de _id para id)
        const novaTarefaLocal = {
            id: novaTarefaAPI.id, 
            texto: novaTarefaAPI.texto,
            concluida: novaTarefaAPI.concluida
        };

        // Adiciona a tarefa (com o ID correto da API) ao estado local
        setTarefas([...tarefas, novaTarefaLocal]);

    } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // ======================================================
  // Remover Tarefa com DELETE para a API
  // ======================================================
  const removerTarefa = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
             // Se o DELETE na API for bem-sucedido (status 204), atualiza o estado local
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
        } else if (response.status === 404) {
            console.warn("Tarefa não encontrada na API, removendo apenas localmente.");
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
        } else {
             throw new Error('Falha ao remover tarefa na API.');
        }

    } catch (error) {
        console.error("Erro ao remover tarefa:", error);
    }
  };


  const adicionarTarefa = (texto) => {
    const novaTarefa = {
      id: Date.now(),
      texto,
      concluida: false
    };
    setTarefas([...tarefas, novaTarefa]);
  };
  
*/

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  const alternarConclusao = (id) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  return (
    <Router>
      <div className="app-container">
        <h1 className='text-bg-secondary p-3'>Cadastro de Tarefas</h1>
        <Header />
        <FormularioDeTarefa onAdd={adicionarTarefa} />
        <Routes>
          <Route path="/" element={<TodasAsTarefas tarefas={tarefas} onToggle={alternarConclusao} onRemove={removerTarefa} />} />
          <Route path="/pendentes" element={<TarefasPendentes tarefas={tarefas} onToggle={alternarConclusao} onRemove={removerTarefa} />} />
          <Route path="/concluidas" element={<TarefasConcluidas tarefas={tarefas} onToggle={alternarConclusao} onRemove={removerTarefa} />} />
          <Route path="/uninassau" element={<Uninassau />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;