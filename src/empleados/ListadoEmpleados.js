import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ListadoEmpleados() {
  const urlBase = "http://localhost:8080/rh-app/empleados";

  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const resultado = await axios.get(urlBase);
    console.log("Resultado cargar empleados");
    console.log(resultado.data);
    setEmpleados(resultado.data);
  };

  const eliminarEmpleado = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarEmpleados();
  };

  const filtrarEmpleados = (empleado) => {
    if (busqueda === "") {
      return true;
    } else {
      return (
        empleado.idEmpleado.toString().includes(busqueda) ||
        empleado.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        empleado.departamento.toLowerCase().includes(busqueda.toLowerCase()) ||
        empleado.sueldo.toString().includes(busqueda)
      );
    }
  };

  return (
    <div className="container">
      <div className="Container text-center" style={{ margin: "30px" }}>
        <h3>Sistema de Recursos Humanos</h3>
      </div>

      <div className="mb-3">
        <label htmlFor="busqueda" className="form-label">
          Buscar:
        </label>
        <input
          type="text"
          className="form-control"
          id="busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <table className="table table-striped table-hover aling-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {empleados.filter(filtrarEmpleados).map((empleado, indice) => (
            <tr key={indice}>
              <th scope="row">{empleado.idEmpleado}</th>
              <td>{empleado.nombre} </td>
              <td>{empleado.departamento} </td>
              <td>
                <NumericFormat
                  value={empleado.sueldo}
                  displayType={"text"}
                  thousandSeparator=","
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                />
              </td>
              <td className="text-center">
                <div>
                  <Link
                    to={`/editar/${empleado.idEmpleado}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarEmpleado(empleado.idEmpleado)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
