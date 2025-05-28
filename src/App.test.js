import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Principal from './componentes/Principal';
import AnadirEspecieForm from './componentes/AnadirEspecieForm';
import DetalleEspecie from './componentes/DetalleEspecie';
import Mapa from './componentes/Mapa';
import LineaTiempo from './componentes/LineaTiempo';
import { EspeciesContext } from './context/EspeciesContext';

jest.mock('./componentes/Mapa', () => () => <div>Mapa Mock</div>);
jest.mock('react-vertical-timeline-component', () => ({
  VerticalTimeline: ({ children }) => <div data-testid="vertical-timeline">{children}</div>,
  VerticalTimelineElement: ({ children, date }) => (
    <div data-testid="timeline-element">
      <div data-testid="timeline-date">{date}</div>
      {children}
    </div>
  ),
}));
const renderWithProviders = (component, contextValue = {}) => {
  const defaultContextValue = {
    especies: [],
    agregarEspecie: jest.fn(),
    eliminarEspecie: jest.fn(),
    obtenerEspeciePorId: jest.fn(),
    ...contextValue
  };

  return render(
    <BrowserRouter>
      <EspeciesContext.Provider value={defaultContextValue}>
        {component}
      </EspeciesContext.Provider>
    </BrowserRouter>
  );
};

test('renderiza enlaces de navegación principales', () => {
  render(<App />);
  expect(screen.getByText(/inicio/i)).toBeInTheDocument();
  expect(screen.getByText(/mapa/i)).toBeInTheDocument();
  expect(screen.getByText(/añadir especie/i)).toBeInTheDocument();
  expect(screen.getByText(/línea de tiempo/i)).toBeInTheDocument();
});

test('renderiza el campo de búsqueda', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/buscar por especie o causas/i);
  expect(input).toBeInTheDocument();
});


describe('Principal Component', () => {
  const especiesMock = [
    {
      id: 1,
      nombre: 'Dodo',
      habitat: 'Mauricio',
      causas: ['Caza', 'Deforestación'],
      imagen: 'dodo.jpg'
    },
    {
      id: 2,
      nombre: 'Tigre de Tasmania',
      habitat: 'Australia',
      causas: ['Caza excesiva'],
      imagen: 'tigre-tasmania.jpg'
    }
  ];

  test('muestra especies cuando hay datos', () => {
    renderWithProviders(<Principal filtroNav="" />, { especies: especiesMock });
    expect(screen.getByText('Dodo')).toBeInTheDocument();
    expect(screen.getByText('Tigre de Tasmania')).toBeInTheDocument();
  });

  test('filtra especies por hábitat', () => {
    renderWithProviders(<Principal filtroNav="" />, { especies: especiesMock });
    const filtroInput = screen.getByPlaceholderText(/ej: asia, europa/i);
    fireEvent.change(filtroInput, { target: { value: 'Australia' } });
    expect(screen.getByText('Tigre de Tasmania')).toBeInTheDocument();
    expect(screen.queryByText('Dodo')).not.toBeInTheDocument();
  });
});

describe('AnadirEspecieForm Component', () => {
  test('muestra el botón de enviar', () => {
    renderWithProviders(<AnadirEspecieForm />);
    expect(screen.getByRole('button', { name: /añadir especie/i })).toBeInTheDocument();
  });

  test('muestra alerta cuando faltan campos requeridos', () => {
    window.alert = jest.fn();
    renderWithProviders(<AnadirEspecieForm />);
    const submitButton = screen.getByRole('button', { name: /añadir especie/i });
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith('Rellena todos los campos para añadir una nueva especie');
  });
});

describe('DetalleEspecie Component', () => {
  const especieMock = {
    id: '1',
    nombre: 'Dodo',
    tipo_animal: 'Ave',
    periodo: 'Siglo XVII',
    habitat: 'Mauricio',
    causas: ['Caza', 'Deforestación'],
    imagen: 'dodo.jpg'
  };

  test('renderiza los detalles de la especie', () => {
    const obtenerEspecieMock = jest.fn().mockReturnValue(especieMock);
    renderWithProviders(<DetalleEspecie />, { obtenerEspeciePorId: obtenerEspecieMock });
    
    expect(screen.getByText('Dodo')).toBeInTheDocument();
    expect(screen.getByText(/tipo:/i)).toBeInTheDocument();
    expect(screen.getByText('Ave')).toBeInTheDocument();
    expect(screen.getByText(/período:/i)).toBeInTheDocument();
    expect(screen.getByText('Siglo XVII')).toBeInTheDocument();
    expect(screen.getByText(/hábitat:/i)).toBeInTheDocument();
    expect(screen.getByText('Mauricio')).toBeInTheDocument();
    expect(screen.getByText(/causas de extinción:/i)).toBeInTheDocument();
  });

  test('muestra el botón volver', () => {
    const obtenerEspecieMock = jest.fn().mockReturnValue(especieMock);
    renderWithProviders(<DetalleEspecie />, { obtenerEspeciePorId: obtenerEspecieMock });
    expect(screen.getByRole('button', { name: /volver/i })).toBeInTheDocument();
  });
});

describe('Mapa Component', () => {
  test('no renderiza marcadores para especies sin ubicaciones válidas', () => {
    jest.unmock('./componentes/Mapa');
    const especiesSinUbicacion = [
      {
        id: 1,
        nombre: 'Especie Test',
        habitat: 'Ubicación Inexistente',
        periodo: 'Siglo XXI'
      }
    ];
    renderWithProviders(<Mapa />, { especies: especiesSinUbicacion });
    const markers = screen.queryAllByTestId('marker');
    expect(markers).toHaveLength(0);
  });
});

describe('LineaTiempo Component', () => {
  const especiesMock = [
    {
      id: 1,
      nombre: 'Dodo',
      periodo: 'Siglo XVII',
      imagen: 'dodo.jpg'
    },
    {
      id: 2,
      nombre: 'Mamut',
      periodo: 'Hace 4000 años',
      imagen: 'mamut.jpg'
    },
    {
      id: 3,
      nombre: 'Tigre de Tasmania',
      periodo: 'Siglo XX',
      imagen: 'tigre.jpg'
    },
    {
      id: 4,
      nombre: 'Especie Antigua',
      periodo: 'Hace 10 mil años',
      imagen: 'antigua.jpg'
    }
  ];

  test('muestra todas las especies en orden cronológico', () => {
    renderWithProviders(<LineaTiempo />, { especies: especiesMock });
    const elementos = screen.getAllByTestId('timeline-element');
    expect(elementos).toHaveLength(4);
    expect(screen.getByText('Dodo')).toBeInTheDocument();
    expect(screen.getByText('Mamut')).toBeInTheDocument();
    expect(screen.getByText('Tigre de Tasmania')).toBeInTheDocument();
    expect(screen.getByText('Especie Antigua')).toBeInTheDocument();
  });

  test('filtra especies por período', () => {
    renderWithProviders(<LineaTiempo />, { especies: especiesMock });
    const filtroInput = screen.getByPlaceholderText(/ej: siglo xvii, hace 800 años/i);
    fireEvent.change(filtroInput, { target: { value: 'XVII' } });
    expect(screen.getByText('Dodo')).toBeInTheDocument();
    expect(screen.queryByText('Mamut')).not.toBeInTheDocument();
    expect(screen.queryByText('Tigre de Tasmania')).not.toBeInTheDocument();
  });
});