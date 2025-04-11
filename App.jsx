import { useState } from 'react';
import './App.css';

function App() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    nivel: '',
    carrera: ''
  });

  const [registros, setRegistros] = useState([]);
  const [carrerasFiltradas, setCarrerasFiltradas] = useState([]);

  const listaCarreras = [
    "Enfermería", "Ingeniería de Sistemas", "Especialización en Docencia", "Ingeniería Industrial",
    "TECNOLOGÍA EN ATENCIÓN PREHOSPITALARIA", "LICENCIATURA EN ESPAÑOL E INGLÉS",
    "Licenciatura en Educación Infantíl", "Licenciatura en Educación Religiosa", "Licenciatura en Música",
    "TEC. EN ATENCIÓN PREHOSPITALARIA EXTENSIÓN BUCARAMANGA", "TEOLOGÍA", "CONTADURÍA PÚBLICA",
    "ADMINISTRACIÓN DE EMPRESAS", "MAESTRÍA EN EDUCACIÓN", "MARKETING Y COMUNICACIÓN DIGITAL",
    "MAESTRÍA EN ESTUDIOS RELIGIOSOS Y TEOLOGÍA", "ESPECIALIZACIÓN EN ALTA GERENCIA",
    "MAESTRÍA EN ESTUDIOS RELIGIOSOS Y TEOLOGÍA VIRTUAL"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });

    if (name === 'nivel') {
      let carreras = [];
      if (value === 'pregrado') {
        const claves = ["enfermería", "ingeniería", "tecnología", "licenciatura", "teología", "contaduría", "administración", "marketing"];
        carreras = listaCarreras.filter(c =>
          claves.some(p => c.toLowerCase().includes(p))
        );
      } else if (value === 'posgrado') {
        const claves = ["especialización", "maestría"];
        carreras = listaCarreras.filter(c =>
          claves.some(p => c.toLowerCase().includes(p))
        );
      }
      setCarrerasFiltradas(carreras);
      setFormulario(prev => ({ ...prev, nivel: value, carrera: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposCompletos = Object.values(formulario).every(v => v.trim() !== '');
    if (!camposCompletos) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    setRegistros([...registros, formulario]);
    setFormulario({
      nombre: '',
      apellido: '',
      correo: '',
      direccion: '',
      nivel: '',
      carrera: ''
    });
    setCarrerasFiltradas([]);
  };

  // ✅ Nueva función para eliminar un registro
  const eliminarRegistro = (index) => {
    const nuevosRegistros = registros.filter((_, i) => i !== index);
    setRegistros(nuevosRegistros);
  };

  return (
    <div className="root-wrapper">
      <div className="container">
        <div id="encabezado">
          <h1>Formulario de registro</h1>
          <p>Ingresa los datos que se solicitan a continuación:</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre*</label>
          <input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={handleChange} required />

          <label htmlFor="apellido">Apellido*</label>
          <input type="text" id="apellido" name="apellido" value={formulario.apellido} onChange={handleChange} required />

          <label htmlFor="correo">Correo electrónico*</label>
          <input type="email" id="correo" name="correo" value={formulario.correo} onChange={handleChange} required />

          <label htmlFor="direccion">Dirección*</label>
          <input type="text" id="direccion" name="direccion" value={formulario.direccion} onChange={handleChange} required />

          <label htmlFor="nivel">Nivel académico*</label>
          <select id="nivel" name="nivel" value={formulario.nivel} onChange={handleChange} required>
            <option value="">-- Selecciona una opción --</option>
            <option value="pregrado">Pregrado</option>
            <option value="posgrado">Posgrado</option>
          </select>

          <label htmlFor="carrera">Carrera*</label>
          <select id="carrera" name="carrera" value={formulario.carrera} onChange={handleChange} required>
            <option value="">-- Primero selecciona el nivel --</option>
            {carrerasFiltradas.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          <button type="submit">Enviar</button>
        </form>

        {registros.length > 0 && (
          <>
            <h3 style={{ marginTop: '2rem' }}>Datos registrados</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Dirección</th>
                    <th>Nivel</th>
                    <th>Carrera</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((dato, index) => (
                    <tr key={index}>
                      <td>{dato.nombre}</td>
                      <td>{dato.apellido}</td>
                      <td>{dato.correo}</td>
                      <td>{dato.direccion}</td>
                      <td>{dato.nivel}</td>
                      <td>{dato.carrera}</td>
                      <td>
                        <button className="btn-eliminar" onClick={() => eliminarRegistro(index)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
