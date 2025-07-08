import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { crearUsuario, loginEmailPass } from "../auth/firebase";
import { dispararSweetBasico } from "../assets/SweetAlert";

function Login2() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const { login, user, logout, admin, logearGmail } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    if (usuario === "admin" && password === "1234") {
      login(usuario);
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then((user) => {
        login(usuario);
        dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential") {
          dispararSweetBasico(
            "Credenciales incorrectas",
            "",
            "error",
            "Cerrar"
          );
        }
        if (error.code == "auth/weak-password") {
          dispararSweetBasico(
            "Contraseña debil",
            "Password should be at least 6 characters",
            "error",
            "Cerrar"
          );
        }
        if (error.code == "auth/email-already-in-use") {
          dispararSweetBasico(
            "Este correo electrónico ya esta en uso",
            "",
            "error",
            "Cerrar"
          );
        }
        //alert("Error")
      });
  }

  const handleSubmit2 = (e) => {
    logout();
  };

  function logInGmail() {
    logearGmail();
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then((user) => {
        login(usuario);
        dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential") {
          dispararSweetBasico(
            "Credenciales incorrectas",
            "",
            "error",
            "Cerrar"
          );
        }
        if (error.code == "auth/email-already-in-use") {
          dispararSweetBasico(
            "Este correo electrónico ya esta en uso",
            "",
            "error",
            "Cerrar"
          );
        }
        //alert("Error")
      });
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  if (user || admin) {
    return (
      <form onSubmit={handleSubmit2}>
        <button type="submit">Cerrar sesión</button>
      </form>
    );
  }
  if (!user && show) {
    return (
      <div className="d-flex flex-column  justify-content-center  align-items-center ">
        <form
          onSubmit={iniciarSesionEmailPass}
          className="p-4 border rounded shadow w-50"
        >
          <h2>Iniciar sesión con Email y pass</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-50">
            Ingresar
          </button>
          <button
            style={{ marginTop: "2px" }}
            className="btn btn-secondary w-50"
            onClick={handleShow}
          >
            Registrate
          </button>
          <button
            style={{ marginTop: "2px" }}
            className="btn btn-secondary w-50"
            onClick={logInGmail}
          >
            Iniciar sesion con Gmail
          </button>
        </form>
      </div>
    );
  }
  if (!user && !show) {
    return (
      <div>
        <form onSubmit={registrarUsuario}>
          <h2>Registrarse</h2>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrase</button>
        </form>
        <button style={{ marginTop: "2px" }} onClick={handleShow}>
          Iniciar Sesión
        </button>
      </div>
    );
  }
  //Formulario para inicio de sesion sin firebase
  /*
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
    
    
    </div>
  );*/
  //Formulario para inicio de sesion sin firebase
}
export default Login2;
