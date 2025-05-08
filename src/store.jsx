import React, { createContext, useReducer, useContext } from "react";
import { toast } from "react-toastify";

const Context = createContext();

export const actionTypes = {
  SET_CONTACTS: "SET_CONTACTS",
  ADD_CONTACT: "ADD_CONTACT",
  DELETE_CONTACT: "DELETE_CONTACT",
  SET_EDITING_CONTACT: "SET_EDITING_CONTACT",
  UPDATE_CONTACT: "UPDATE_CONTACT",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR"
};

const initialState = {
  contacts: [],
  editingContact: null,
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_CONTACTS:
      return { ...state, contacts: action.payload, loading: false };
    case actionTypes.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case actionTypes.DELETE_CONTACT:
      return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload) };
    case actionTypes.SET_EDITING_CONTACT:
      return { ...state, editingContact: action.payload };
    case actionTypes.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
        editingContact: null
      };
    case actionTypes.SET_LOADING:
      return { ...state, loading: true };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchContacts = async () => {
    dispatch({ type: actionTypes.SET_LOADING });
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts", {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        dispatch({ type: actionTypes.SET_CONTACTS, payload: data });
      } else {
        dispatch({ type: actionTypes.SET_CONTACTS, payload: [] });
        toast.error("No contact list received from server.");
      }
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      toast.error("Failed to fetch contacts");
    }
  };

  const addContact = async (newContact) => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newContact),
      });
      const data = await response.json();
      dispatch({ type: actionTypes.ADD_CONTACT, payload: data });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: "Failed to add contact" });
      toast.error("Failed to add contact");
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedContact),
      });
      const data = await response.json();
      dispatch({ type: actionTypes.UPDATE_CONTACT, payload: data });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: "Failed to update contact" });
      toast.error("Failed to update contact");
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/contact/agendas/ErikRuiz/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      dispatch({ type: actionTypes.DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: "Failed to delete contact" });
      toast.error("Failed to delete contact");
    }
  };

  const contextValue = {
    state,
    dispatch,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}

export function useStore() {
  return useContext(Context);
}
