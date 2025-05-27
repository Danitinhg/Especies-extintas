import React, { useContext, useState } from 'react';
import { EspeciesContext } from '../context/EspeciesContext';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Form } from 'react-bootstrap';

const LineaTiempo = () => {
  const { especies } = useContext(EspeciesContext);
  const [filtroPeriodo, setFiltroPeriodo] = useState('');

  const imgURL = (imagen) => {
  if (!imagen) return '';
  if (imagen.startsWith('http') || imagen.startsWith('data:') || imagen.startsWith('blob:')) return imagen;
  return `/imagenes/${imagen}`;
  };

  const especiesFiltradas = especies.filter(e =>
    e.periodo?.toLowerCase().includes(filtroPeriodo.toLowerCase())
  );

  return (
    <div className="p-3">
      <h2 className="mb-4">Línea de Tiempo de Especies Extintas</h2>

      <Form.Group className="mb-4" controlId="filtroPeriodo">
        <Form.Label>Filtrar por período</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Siglo XVII, ..."
          value={filtroPeriodo}
          onChange={(e) => setFiltroPeriodo(e.target.value)}
        />
      </Form.Group>

      <VerticalTimeline>
        {especiesFiltradas.map((especie) => (
          <VerticalTimelineElement key={especie.id} date={especie.periodo} iconStyle={{ background: '#6c757d', color: '#fff' }}>
            <h3 className="vertical-timeline-element-title">{especie.nombre}</h3>
            {especie.imagen && (
              <img src={imgURL(especie.imagen)} alt={especie.nombre}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '150px', 
                  marginTop: '10px' }}/>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default LineaTiempo;
