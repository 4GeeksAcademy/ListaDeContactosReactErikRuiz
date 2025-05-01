import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Contact from "./views/Contact";
import AddContact from "./views/AddContact";

const Layout = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">ContactApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Contactos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Añadir Contacto</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;