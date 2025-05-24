import { Link } from "react-router-dom";

export const Navbar = ({ onNewContact }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Mi Agenda de Contactos</span>
        </Link>
        <div className="ml-auto">
          <button 
            className="btn btn-primary" 
            onClick={onNewContact}
          >
            <i className="fas fa-plus me-2"></i> Nuevo Contacto
          </button>
        </div>
      </div>
    </nav>
  );
};