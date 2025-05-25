import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EspeciesContext } from '../context/EspeciesContext';

const AnadirEspecieForm = () => {
  const { agregarEspecie } = useContext(EspeciesContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    periodo: '',
    habitat: '',
    tipo_animal: '',
    causas: '',
    imagenFile: null,
  });

  const [previewURL, setPreviewURL] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagenFile: file,
      }));
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.imagenFile) {
      alert('Nombre e imagen son obligatorios');
      return;
    }

    const nuevaEspecie = {
      id: Date.now(),
      nombre: formData.nombre,
      periodo: formData.periodo,
      habitat: formData.habitat,
      tipo_animal: formData.tipo_animal,
      causas: formData.causas.split(',').map((c) => c.trim()),
      imagen: previewURL,
    };

    agregarEspecie(nuevaEspecie);
    navigate('/');
  };

  return (
    <Card className="p-4">
      <h3>Añadir Nueva Especie</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Período</Form.Label>
          <Form.Control type="text" name="periodo" value={formData.periodo} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hábitat</Form.Label>
          <Form.Control type="text" name="habitat" value={formData.habitat} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo de Animal</Form.Label>
          <Form.Control type="text" name="tipo_animal" value={formData.tipo_animal} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Causas (separadas por coma)</Form.Label>
          <Form.Control type="text" name="causas" value={formData.causas} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
        </Form.Group>

        {previewURL && (
          <div className="mb-3">
            <p>Vista previa:</p>
            <img src={previewURL} alt="Vista previa" style={{ maxWidth: '200px', height: 'auto' }} />
          </div>
        )}

        <Button variant="success" type="submit">Añadir Especie</Button>
      </Form>
    </Card>
  );
};

export default AnadirEspecieForm;
