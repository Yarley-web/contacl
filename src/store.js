export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contacts: [],
    loading: false,
    error: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'fetch_contacts_start':
      return { ...store, loading: true, error: null };
      
    case 'fetch_contacts_success':
      return { 
        ...store, 
        loading: false, 
        contacts: action.payload,
        error: null
      };
      
    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
        loading: false,
        error: null
      };
      
    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false,
        error: null
      };
      
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload),
        loading: false,
        error: null
      };
      
    case 'fetch_contacts_error':
      return { ...store, loading: false, error: action.payload };
      
    default:
      return store;
  }
}