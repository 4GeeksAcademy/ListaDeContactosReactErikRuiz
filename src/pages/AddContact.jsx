import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { toast } from "react-toastify";

function AddContact() {
  const { state, dispatch, addContact, updateContact } = useStore();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    agenda_slug: "ErikRuiz",
    address: "",
    phone: "",
    id: null
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.editingContact) setForm({ ...state.editingContact });
  }, [state.editingContact]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value || "" }));
  };

  const isValid = () => {
    return ["name", "email", "phone", "address"].every(
      key => typeof form[key] === "string" && form[key].trim() !== ""
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Submitting contact:", form);
    if (!isValid()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      if (state.editingContact && form.id) {
        await updateContact(form.id, form);
        toast.success("Contact updated successfully");
      } else {
        await addContact(form);
        toast.success("Contact added successfully");
      }
      dispatch({ type: "SET_EDITING_CONTACT", payload: null });
      navigate("/");
    } catch {
      toast.error("Failed to save contact");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-4">
        <input name="full_name" value={form.full_name || ""} onChange={handleChange} placeholder="Full name" className="form-control mb-2" disabled={submitting} />
        <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" className="form-control mb-2" disabled={submitting} />
        <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" className="form-control mb-2" disabled={submitting} />
        <input name="address" value={form.address || ""} onChange={handleChange} placeholder="Address" className="form-control mb-2" disabled={submitting} />
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : state.editingContact ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default AddContact;