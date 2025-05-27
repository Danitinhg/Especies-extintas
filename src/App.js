import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

import Principal from './componentes/Principal';
import DetalleEspecie from './componentes/DetalleEspecie';
import AnadirEspecieForm from './componentes/AnadirEspecieForm';
import Mapa from './componentes/Mapa';
import LineaTiempo from './componentes/LineaTiempo';
import { EspeciesProvider } from './context/EspeciesContext';
import { useState } from 'react';

function App() {

  const [filtroNav, setFiltroNav] = useState('');

  return (
    <EspeciesProvider>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Especies Extintas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/mapa">Mapa</Nav.Link>
                <Nav.Link as={Link} to="/nueva">Añadir Especie</Nav.Link>
                <Nav.Link as={Link} to="/linea">Línea de Tiempo</Nav.Link>
              </Nav>
              <Form className="d-flex w-50">
                <FormControl type="search" placeholder="Buscar por especie o causas" className='me-2' aria-label='Search' value={filtroNav} onChange={(e) => setFiltroNav(e.target.value)}/>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Principal filtroNav={filtroNav} />} />
            <Route path="/especie/:id" element={<DetalleEspecie />} />
            <Route path="/nueva" element={<AnadirEspecieForm />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/linea" element={<LineaTiempo />} />
          </Routes>
        </Container>
      </Router>
    </EspeciesProvider>
  );
}

export default App;
