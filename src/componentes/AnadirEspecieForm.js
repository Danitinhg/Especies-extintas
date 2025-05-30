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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertirABase64(file);
        setFormData((prev) => ({
          ...prev,
          imagenFile: file,
        }));
        setPreviewURL(base64);
      } catch (err) {
        console.error('Error con la imagen', err);
      }
    }
  };

  const convertirABase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.imagenFile || !formData.periodo || !formData.habitat || !formData.causas || !formData.tipo_animal) {
      alert('Rellena todos los campos para añadir una nueva especie');
      return;
    }

    const base64 = previewURL;

    const nuevaEspecie = {
      id: Date.now(),
      nombre: formData.nombre,
      periodo: formData.periodo,
      habitat: formData.habitat,
      tipo_animal: formData.tipo_animal,
      causas: formData.causas.split(',').map((c) => c.trim()),
      imagen: base64,
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
          <Form.Control type="text" name="periodo" value={formData.periodo} onChange={handleChange} required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hábitat</Form.Label>
          <Form.Control type="text" name="habitat" value={formData.habitat} onChange={handleChange} required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo de Animal</Form.Label>
          <Form.Control type="text" name="tipo_animal" value={formData.tipo_animal} onChange={handleChange} required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Causas (separadas por coma)</Form.Label>
          <Form.Control type="text" name="causas" value={formData.causas} onChange={handleChange} required/>
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
