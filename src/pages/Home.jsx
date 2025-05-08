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
        const res = await fetch("https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts", {
          headers: { Accept: "application/json" },
        });

        if (res.status === 404) {
          await fetch("https://playground.4geeks.com/contact/agendas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: "ErikRuiz" }),
          });
        }

        await fetchContacts();

        if (Array.isArray(state.contacts) && state.contacts.length === 0) {
          const defaultContact = {
            name: "Ana Ruiz",
            phone: "622001122",
            email: `ana${Date.now()}@email.com`,
            address: "Calle Luna 10",
            agenda_slug: "ErikRuiz"
          };

          const isValid = Object.values(defaultContact).every(
            field => typeof field === "string" && field.trim() !== ""
          );

          if (!isValid) {
            toast.error("Default contact is missing required fields.");
            return;
          }

          console.log("Sending default contact:", defaultContact);

          const res = await fetch("https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(defaultContact)
          });

          if (!res.ok) {
            toast.error("Failed to create default contact (422)");
            return;
          }

          const data = await res.json();
          dispatch({ type: "ADD_CONTACT", payload: data });
dispatch({ type: "SET_EDITING_CONTACT", payload: data });
          toast.info("Default contact created.");
        }
      } catch (error) {
        toast.error("Failed to load contacts");
      }
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
            key={`contact-${contact.id ?? contact.email}`}
            contact={contact}
            onEdit={() => dispatch({ type: "SET_EDITING_CONTACT", payload: contact })}
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
