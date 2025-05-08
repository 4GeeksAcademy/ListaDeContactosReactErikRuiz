import React from "react";
import { useNavigate } from "react-router-dom";

function ContactCard({ contact, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center border p-3 mb-2">
      <img
        src="https://randomuser.me/api/portraits/men/10.jpg"
        className="rounded-circle me-3"
        width="80"
        alt="profile"
      />
      <div className="flex-grow-1">
        <h5>{contact.full_name}</h5>
        <p><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
        <p><i className="fas fa-phone me-2"></i>{contact.phone}</p>
        <p><i className="fas fa-envelope me-2"></i>{contact.email}</p>
      </div>
      <div>
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => {
            onEdit();
            navigate("/add");
          }}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button className="btn btn-outline-danger" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default ContactCard;
