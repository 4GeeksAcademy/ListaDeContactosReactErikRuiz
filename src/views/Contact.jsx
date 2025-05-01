import React, { useContext } from "react";
import { Context } from "../store";
import ContactCard from "../components/ContactCard";

const Contact = () => {
  const { store } = useContext(Context);

  if (!Array.isArray(store.contacts)) return <p>No hay contactos disponibles</p>;

  return (
    <div className="container mt-4">
      <h1>Lista de Contactos</h1>
      <div className="row">
        {store.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default Contact;