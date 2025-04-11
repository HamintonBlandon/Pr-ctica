import { useState } from "react";

function App() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    direccion: ""
  });

  const [registros, setRegistros] = useState([]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistros([...registros, formulario]);
    setFormulario({
      nombre: "",
      apellido: "",
      correo: "",
      direccion: ""
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formulario.apellido}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formulario.direccion}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Agregar</button>
      </form>

      <hr />

      <h3>Datos registrados</h3>
      {registros.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((dato, index) => (
              <tr key={index}>
                <td>{dato.nombre}</td>
                <td>{dato.apellido}</td>
                <td>{dato.correo}</td>
                <td>{dato.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
