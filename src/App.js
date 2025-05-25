import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

import Principal from './componentes/Principal';
import DetalleEspecie from './componentes/DetalleEspecie';
import AnadirEspecieForm from './componentes/AnadirEspecieForm';
//import Mapa from './componentes/Mapa';

import { EspeciesProvider } from './context/EspeciesContext';

function App() {
  return (
    <EspeciesProvider>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Especies Extintas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/mapa">Mapa</Nav.Link>
                <Nav.Link href="/nueva">Añadir Especie</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/especie/:id" element={<DetalleEspecie />} />
            <Route path="/nueva" element={<AnadirEspecieForm />} />
            {/*<Route path="/mapa" element={<Mapa />} />*/}
          </Routes>
        </Container>
      </Router>
    </EspeciesProvider>
  );
}

export default App;
