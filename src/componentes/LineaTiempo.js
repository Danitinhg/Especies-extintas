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

  const obtenerValorOrden = (periodo) => {
    if (!periodo) return Infinity;

    const lower = periodo.toLowerCase();

    if (lower.includes('hace')) {
      const match = lower.match(/hace\s+(\d+)(?:\s+mil)?\s*años/);
      if (match) {
        const num = parseInt(match[1]);
        if (lower.includes('mil')) {
          return -num * 1000;
        }
        return -num;
      }
    }

    const matchSiglo = lower.match(/siglo\s+(x{0,3}(ix|iv|v?i{0,3}))/i);
    if (matchSiglo) {
      const sigloRomano = matchSiglo[1].toUpperCase();
      const valoresRomanos = {
        I: 1, II: 2, III: 3, IV: 4, V: 5,
        VI: 6, VII: 7, VIII: 8, IX: 9,
        X: 10, XI: 11, XII: 12, XIII: 13,
        XIV: 14, XV: 15, XVI: 16, XVII: 17,
        XVIII: 18, XIX: 19, XX: 20, XXI: 21,
      };
      return 1000 + (valoresRomanos[sigloRomano] || 9999);
    }

    return Infinity;
  };

  const especiesOrdenadas = [...especiesFiltradas].sort((a, b) =>
    obtenerValorOrden(a.periodo) - obtenerValorOrden(b.periodo)
  );

  return (
    <div className="p-3">
      <h2 className="mb-4">Línea de Tiempo de Especies Extintas</h2>

      <Form.Group className="mb-4" controlId="filtroPeriodo">
        <Form.Label>Filtrar por período</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Siglo XVII, hace 800 años..."
          value={filtroPeriodo}
          onChange={(e) => setFiltroPeriodo(e.target.value)}/>
      </Form.Group>

      <VerticalTimeline>
        {especiesOrdenadas.map((especie) => (
          <VerticalTimelineElement
            key={especie.id}
            date={especie.periodo}
            iconStyle={{ background: '#6c757d', color: '#fff' }}>
            <h3 className="vertical-timeline-element-title">{especie.nombre}</h3>
            {especie.imagen && (
              <img
                src={imgURL(especie.imagen)}
                alt={especie.nombre}
                style={{
                  maxWidth: '100%',
                  maxHeight: '150px',
                  marginTop: '10px'
                }}
              />
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default LineaTiempo;
