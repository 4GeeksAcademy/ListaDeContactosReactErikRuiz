import React, { useContext, useState } from "react";
import { Context } from "../store";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    actions.deleteContact(contact.id);
    setShowModal(false);
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5>{contact.full_name}</h5>
          <p className="mb-1"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
          <p className="mb-1"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
          <p className="mb-0"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
        </div>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => navigate(`/edit/${contact.id}`)}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="btn btn-outline-danger" onClick={() => setShowModal(true)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Estás seguro?</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Deseas eliminar este contacto permanentemente?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;