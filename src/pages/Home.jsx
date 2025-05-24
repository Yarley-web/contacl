import { useEffect, useState } from "react";
import { fetchContacts, createContact, updateContact, deleteContact } from "../utils/api.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactForm } from "../components/ContactForm";
import { useOutletContext } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { showModal, setShowModal } = useOutletContext();
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    fetchContacts(dispatch);
  }, [dispatch]);

  const handleCreateContact = async (contactData) => {
    try {
      dispatch({ type: 'fetch_contacts_start' });
      await createContact(contactData, dispatch);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  const handleEditContact = (contact) => {
    setCurrentContact(contact);
    setShowModal(true);
  };

  const handleUpdateContact = async (contactData) => {
    try {
      await updateContact(currentContact.id, contactData, dispatch);
      setShowModal(false);
      setCurrentContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
      try {
        await deleteContact(contactId, dispatch);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  if (store.loading) {
    return <div className="text-center mt-5">Loading contacts...</div>;
  }

  if (store.error) {
    return <div className="text-center mt-5 text-danger">Error: {store.error}</div>;
  }

  return (
    <div className="container mt-5">
      {/* Modal para crear/editar contacto */}
      {showModal && (
        <div className="modal fade show d-block" id="contactModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentContact ? 'Editar Contacto' : 'Nuevo Contacto'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowModal(false);
                    setCurrentContact(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <ContactForm 
                  initialData={currentContact || {}}
                  onSave={currentContact ? handleUpdateContact : handleCreateContact} 
                  onClose={() => {
                    setShowModal(false);
                    setCurrentContact(null);
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}

      <h1 className="text-center mb-4">My Contacts</h1>
      <div className="row">
        {store.contacts?.length > 0 ? (
          store.contacts.map((contact) => (
            <div key={contact.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{contact.name || 'No name'}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <i className="fas fa-envelope me-2"></i>
                    {contact.email || 'No email'}
                  </h6>
                  <ul className="list-unstyled">
                    <li className="mb-1">
                      <i className="fas fa-phone me-2"></i>
                      {contact.phone || 'No phone'}
                    </li>
                    <li className="text-truncate">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {contact.address || 'No address'}
                    </li>
                  </ul>
                </div>
                <div className="card-footer bg-white">
                  <div className="d-flex justify-content-between">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditContact(contact)}
                    >
                      <i className="fas fa-edit me-1"></i> Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="alert alert-info">No contacts found</div>
          </div>
        )}
      </div>
    </div>
  );
};