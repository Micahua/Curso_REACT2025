import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import "../styles/FormularioEdicion.css";

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProductoFirebase, productoEncontrado, editarProductoF } =
    useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    obtenerProductoFirebase(id)
      .then(() => {
        setCargando(false);
      })
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        }
        if (error === "Hubo un error al obtener el producto.") {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) {
      return "La url de la imagen no debe estar vacía.";
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      editarProductoF(producto)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Producto actualizado correctamente.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: `Hubo un problema al actualizar el producto: ${error.message}`,
            confirmButtonText: "Entendido",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en la carga de producto",
        text: validarForm,
      });
    }
  };
  return (
    <div className="form-container">
      <h2>Editar Producto</h2>

      {/* Mensaje de error si el producto no se encuentra */}
      {error && <div className="error-message">{error}</div>}

      {/* Verifica que el producto esté cargado antes de mostrar el formulario */}
      {cargando ? (
        <div>Cargando...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={producto.name || ""}
              onChange={handleChange}
              required
              placeholder="Ej: Camiseta"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagen">URL de la Imagen:</label>
            <input
              id="imagen"
              type="text"
              name="imagen"
              value={producto.imagen || ""}
              onChange={handleChange}
              required
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              id="price"
              type="number"
              name="price"
              value={producto.price || ""}
              onChange={handleChange}
              required
              min="0"
              placeholder="Ej: 199.99"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={producto.description || ""}
              onChange={handleChange}
              required
              placeholder="Describe el producto"
            />
          </div>
          {/* Contenedor de botones */}
          <div className="button-container">
            <button type="submit" disabled={cargando}>
              {cargando ? "Cargando..." : "Actualizar Producto"}
            </button>
            <button
              className="volver-btn"
              onClick={() => navegar("/")} // Navega hacia productos
            >
              🔙 Volver a Productos
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormularioEdicion;
