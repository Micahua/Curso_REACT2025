import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import "../styles/FormularioProducto.css";

function FormularioProductoFirebase() {
  const { agregarProductoFirebase } = useProductosContext();
  const { admin } = useAuthContext();
  const navegar = useNavigate(); // Hook para navegar

  const [producto, setProducto] = useState({
    name: "",
    price: "",
    description: "",
    imagen: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0)
      return "El precio debe ser mayor a 0.";
    if (!producto.description.trim() || producto.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen.trim())
      return "La URL de la imagen no debe estar vacía.";
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validacion = validarFormulario();

    if (validacion === true) {
      setLoading(true);
      try {
        await agregarProductoFirebase(producto);
        setProducto({ name: "", price: "", description: "", imagen: "" });
        dispararSweetBasico(
          "Producto agregado con éxito",
          "Ok",
          "success",
          "Cerrar"
        );
      } catch (error) {
        dispararSweetBasico(
          "Hubo un problema al agregar el producto",
          error.message,
          "error",
          "Cerrar"
        );
      } finally {
        setLoading(false);
      }
    } else {
      dispararSweetBasico(
        "Error en la carga de producto",
        validacion,
        "error",
        "Cerrar"
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Producto</h2>

      {/* Mensaje de error */}
      <div className="form-message">{loading && <p>Cargando...</p>}</div>

      <form className="formulario-producto" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Ej: Zapatillas"
            value={producto.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagen">URL de la Imagen</label>
          <input
            id="imagen"
            type="text"
            name="imagen"
            placeholder="https://..."
            value={producto.imagen}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="Ej: 199.99"
            value={producto.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe el producto"
            value={producto.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        {/* Contenedor de botones */}
        <div className="button-container">
          {/* Botón Volver */}
          <button
            className="volver-btn"
            onClick={() => navegar("/productos")} // Navega hacia productos
          >
            🔙 Volver a Productos
          </button>

          {/* Botón Agregar Producto */}
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? "Cargando..." : "Agregar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioProductoFirebase;
