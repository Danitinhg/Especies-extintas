import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import { EspeciesContext } from '../context/EspeciesContext';

const DetalleEspecie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerEspeciePorId } = useContext(EspeciesContext);

  const imgURL = (imagen) => {
  if (!imagen) return '';
  if (imagen.startsWith('http') || imagen.startsWith('blob:')) return imagen;
  return `/imagenes/${imagen}`;
  };

  const especie = obtenerEspeciePorId(id);

  if (!especie) {
    return <p>Especie no encontrada.</p>;
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        ← Volver
      </Button>

      <Card>
        <Card.Img
          variant="top"
          src={imgURL(especie.imagen)}
          alt={especie.nombre}
          style={{ 
            height: '300px',
            width: '100%',  
            objectFit: 'contain' 
            }}
        />
        <Card.Body>
          <Card.Title>{especie.nombre}</Card.Title>
          <Card.Text><strong>Tipo:</strong> {especie.tipo_animal}</Card.Text>
          <Card.Text><strong>Período:</strong> {especie.periodo}</Card.Text>
          <Card.Text><strong>Hábitat:</strong> {especie.habitat}</Card.Text>
          <Card.Text>
            <strong>Causas de extinción:</strong><br />
            {especie.causas.map((causa, index) => (
              <Badge key={index} bg="danger" className="me-2">{causa}</Badge>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetalleEspecie;