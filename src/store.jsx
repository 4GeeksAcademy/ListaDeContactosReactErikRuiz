import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const StoreWrapper = ({ children }) => {
  const [store, setStore] = useState({
    contacts: [],
  });

  const AGENDA = "ErikRuiz";
  const API = "https://playground.4geeks.com/contact";

  const getContacts = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts`);
      const data = await response.json();
      setStore((prev) => ({ ...prev, contacts: data }));
    } catch (error) {
      console.error("Error cargando contactos:", error);
    }
  };

  const addContact = async (contact) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: AGENDA }),
      });
      if (!response.ok) throw new Error("No se pudo crear el contacto");
      await getContacts();
    } catch (error) {
      console.error("Error creando contacto:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts`, { method: "DELETE" });
      await getContacts();
    } catch (error) {
      console.error("Error eliminando contacto:", error);
    }
  };

  const updateContact = async (id, updated) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updated, agenda_slug: AGENDA }),
      });
      if (!response.ok) throw new Error("No se pudo actualizar el contacto");
      await getContacts();
    } catch (error) {
      console.error("Error actualizando contacto:", error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const actions = { getContacts, addContact, deleteContact, updateContact };

  return (
    <Context.Provider value={{ store, actions }}>
      {children}
    </Context.Provider>
  );
};