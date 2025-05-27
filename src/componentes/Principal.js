import React, { useContext, useState } from 'react';
import { Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EspeciesContext } from '../context/EspeciesContext';

function Principal({ filtroNav }) {
  const { especies, eliminarEspecie } = useContext(EspeciesContext);
  const [filtro, setFiltro] = useState('');

  const imgURL = (imagen) => {
  if (!imagen) return '';
  if (imagen.startsWith('http') || imagen.startsWith('data:') || imagen.startsWith('blob:')) return imagen;
  return `/imagenes/${imagen}`;
  };

  const especiesFiltradas = especies.filter(e =>
    (filtroNav === '' || e.nombre.toLowerCase().includes(filtroNav.toLowerCase()) || e.causas.some(causa =>
       causa.toLowerCase().includes(filtroNav.toLowerCase()))) && 
    (filtro === '' || e.habitat.toLowerCase().includes(filtro.toLowerCase()))
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
                <Link to={`/especie/${especie.id}`}>
                  <Card.Title>{especie.nombre}</Card.Title>
                </Link>
                <Card.Text>
                    <strong>Causas de extinción:</strong><br />
                    {especie.causas.map((causa, index) => (
                      <Badge key={index} bg="danger" className="me-2">{causa}</Badge>
                    ))}
                </Card.Text>
                <Button variant="dark" onClick={() => eliminarEspecie(especie.id)}>Eliminar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <button onClick={() => {localStorage.removeItem('especies'); window.location.reload();}} 
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          borderRadius: '11px',
          padding: 0
         }}><img src="/imagenes/recarg.jpg" alt="Restablecer" style={{ width: '40px', height: '40px', borderRadius: '10px' }} /></button>
    </div>
  );
}

export default Principal;