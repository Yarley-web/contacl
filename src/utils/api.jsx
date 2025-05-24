const BASE_URL = 'https://playground.4geeks.com/contact';

export const fetchContacts = async (dispatch) => {
    try {
        dispatch({ type: 'fetch_contacts_start' });

        const response = await fetch(`${BASE_URL}/agendas/arleyagenda/contacts`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch contacts');
        }

        const data = await response.json();
        
        if (!data.contacts || !Array.isArray(data.contacts)) {
            console.warn("La API no devolvió un array de contactos:", data);
            throw new Error('Formato de datos inválido');
        }

        dispatch({ 
            type: 'fetch_contacts_success', 
            payload: data.contacts 
        });
        
        return data.contacts;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        dispatch({ 
            type: 'fetch_contacts_error', 
            payload: error.message 
        });
        throw error;
    }
};

export const createContact = async (contactData, dispatch) => {
    try {
        dispatch({ type: 'fetch_contacts_start' });

        const response = await fetch(`${BASE_URL}/agendas/arleyagenda/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create contact');
        }

        const newContact = await response.json();
        
        dispatch({ 
            type: 'add_contact', 
            payload: newContact 
        });
        
        return newContact;
    } catch (error) {
        console.error("Error creating contact:", error);
        dispatch({ 
            type: 'fetch_contacts_error', 
            payload: error.message 
        });
        throw error;
    }
};

export const updateContact = async (contactId, updatedData, dispatch) => {
    try {
        dispatch({ type: 'fetch_contacts_start' });

        const response = await fetch(`${BASE_URL}/agendas/arleyagenda/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update contact');
        }

        const updatedContact = await response.json();
        
        dispatch({ 
            type: 'update_contact', 
            payload: updatedContact 
        });
        
        return updatedContact;
    } catch (error) {
        console.error("Error updating contact:", error);
        dispatch({ 
            type: 'fetch_contacts_error', 
            payload: error.message 
        });
        throw error;
    }
};

export const deleteContact = async (contactId, dispatch) => {
    try {
        dispatch({ type: 'fetch_contacts_start' });

        const response = await fetch(`${BASE_URL}/agendas/arleyagenda/contacts/${contactId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete contact');
        }

        dispatch({ 
            type: 'delete_contact', 
            payload: contactId 
        });
        
        return true;
    } catch (error) {
        console.error("Error deleting contact:", error);
        dispatch({ 
            type: 'fetch_contacts_error', 
            payload: error.message 
        });
        throw error;
    }
};