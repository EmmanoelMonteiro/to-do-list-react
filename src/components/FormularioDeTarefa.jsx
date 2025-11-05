import { useState } from 'react';

function FormularioDeTarefa({ onAdd }) {
  const [tarefa, setTarefa] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarefa.trim()) {
      onAdd(tarefa);
      setTarefa('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 d-flex">
      <input
        type="text"
        placeholder="Adicionar nova tarefa..."
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
        className="form-control me-2"
      />
      <button type="submit" className="btn btn-primary">Adicionar</button>
    </form>
  );
}

export default FormularioDeTarefa;