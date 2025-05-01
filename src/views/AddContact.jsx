import React, { useContext, useState } from "react";
import { Context } from "../store.jsx";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await actions.addContact(form);
    navigate("/contactos");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Agregar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre Completo</label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Contacto
        </button>
      </form>
    </div>
  );
};

export default AddContact;