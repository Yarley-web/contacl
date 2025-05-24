import { useState, useEffect } from "react";

export const ContactForm = ({ initialData = {}, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    setFormData({
      name: initialData.name || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      address: initialData.address || ''
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="tel"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <textarea
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      
      <div className="d-flex justify-content-end gap-2">
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={onClose}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData.id ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};