import { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { EspeciesContext } from '../context/EspeciesContext';

const ubicacionesHabitat = {
  "Isla Mauricio": [-20.3484, 57.5522],
  "Australia, Tasmania": [-42.0409, 146.8087],
  "Sudáfrica": [-30.5595, 22.9375],
  "América del Norte": [45.0, -100.0],
  "Nueva Zelanda": [-40.9006, 174.8860],
  "Europa, Asia, Norte de África": [47.0, 15.0],
  "Atlántico Norte": [40.0, -40.0],
  "Siberia": [65.0, 105.0],
  "America": [10.0, -70.0],
  "Estados Unidos, Cuba": [25.0, -81.0],
  "Río Yangtsé, China": [30.7, 112.3],
};

const Mapa = () => {
  const { especies } = useContext(EspeciesContext);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {especies.map((especie, index) => {
          const coords = ubicacionesHabitat[especie.habitat];
          if (!coords) return null;

          return (
            <Marker key={index} position={coords}>
              <Popup>
                <Link to={`/especie/${especie.id}`}>
                  <strong>{especie.nombre}</strong><br />
                </Link>
                {especie.periodo && <>Extinto: {especie.periodo}</>}<br />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Mapa;
