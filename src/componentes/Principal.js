import React, { useContext, useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EspeciesContext } from '../context/EspeciesContext';

function Principal() {
  const { especies, eliminarEspecie } = useContext(EspeciesContext);
  const [filtro, setFiltro] = useState('');

  const imgURL = (imagen) => {
  if (!imagen) return '';
  if (imagen.startsWith('http') || imagen.startsWith('blob:')) return imagen;
  return `/imagenes/${imagen}`;
  };


  const especiesFiltradas = especies.filter(e =>
    filtro === '' || e.habitat.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <h1>Especies Extintas</h1>

      <Form className="mb-4">
        <Form.Group controlId="filtroHabitat">
          <Form.Label>Filtrar por hábitat</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Asia, Europa..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Row>
        {especiesFiltradas.map((especie, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={imgURL(especie.imagen)} alt={especie.nombre} 
              style={{ 
                height: '200px', 
                width: '100%', 
                objectFit: 'contain'
                }} />
              <Card.Body>
                <Card.Title>{especie.nombre}</Card.Title>
                <Card.Text><strong>Hábitat:</strong> {especie.habitat}</Card.Text>
                <Link to={`/especie/${especie.id}`}>
                  <Button variant="primary" className="me-2">Detalles</Button>
                </Link>
                <Button variant="danger" onClick={() => eliminarEspecie(especie.id)}>Eliminar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <button onClick={() => {localStorage.removeItem('especies'); window.location.reload();}}>Restablecer</button>
    </div>
  );
}

export default Principal;