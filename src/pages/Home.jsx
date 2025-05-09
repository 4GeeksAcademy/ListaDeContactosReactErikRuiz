import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const { state, dispatch, fetchContacts, deleteContact, addContact } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const ensureAgendaAndLoadContacts = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const res = await fetch("https://playground.4geeks.com/contact/agendas/ErikRuiz123/contacts", {
          headers: { Accept: "application/json" },
        });

        if (res.status === 404) {
          await fetch("https://playground.4geeks.com/contact/agendas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: "ErikRuiz123" }),
          });
        }

        await fetchContacts();

      } catch{}

       
    };
    ensureAgendaAndLoadContacts();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteContact(contactToDelete);
      toast.success("Contact deleted successfully");
    } catch {
      toast.error("Failed to delete contact");
    }
    setShowModal(false);
  };

  return (
    <div className="container">
      {state.error && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {state.error}
        </div>
      )}

      <Link to="/add" className="btn btn-success mt-3">Add new contact</Link>

      {state.loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : Array.isArray(state.contacts) && state.contacts.length > 0 ? (
        state.contacts.map(contact => (
          <ContactCard
            // key={`contact-${contact.email}`}
            contact={contact}
            onEdit={() => {
            dispatch({ type: "SET_EDITING_CONTACT", payload: contact });
            window.location.href = "/add";
            }}
            onDelete={() => {
              setContactToDelete(contact.id);
              setShowModal(true);
            }}
          />
        ))
      ) : (
        <p className="mt-3">No contacts available.</p>
      )}

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm delete</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this contact?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
