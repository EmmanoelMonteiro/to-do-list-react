import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-light p-3 mb-4 d-flex gap-3 border-bottom">
      <NavLink to="/" end className={({ isActive }) =>isActive ? "btn btn-sm btn-secondary" : "btn btn-sm btn-outline-info"}>Todas</NavLink>
      <NavLink to="/pendentes" className={({ isActive }) =>isActive ? "btn btn-sm btn-secondary" : "btn btn-sm btn-outline-info"}>Pendentes</NavLink>
      <NavLink to="/concluidas" className={({ isActive }) =>isActive ? "btn btn-sm btn-secondary" : "btn btn-sm btn-outline-info"}>Concluídas</NavLink>
    </nav>
  );
}

export default Header;