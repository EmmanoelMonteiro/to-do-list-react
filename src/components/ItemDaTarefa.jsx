function ItemDaTarefa({ tarefa, onToggle, onRemove }) {
  return (
    <li className={`task-item ${tarefa.concluida ? 'completed' : ''}`}>
      <span onClick={() => onToggle(tarefa.id)}>{tarefa.texto}</span>
      <div>
        <button class="btn btn-danger" onClick={() => onRemove(tarefa.id)}>Excluir</button>
      </div>
    </li>
  );
}

export default ItemDaTarefa;