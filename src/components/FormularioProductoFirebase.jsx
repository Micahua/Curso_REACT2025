import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { Card, Container, Form, Button } from "react-bootstrap"; // Usando componentes de Bootstrap
import "../styles/FormularioProducto.css"; // Para los estilos adicionales

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
    <Container className="form-container my-4 d-flex justify-content-center">
      <Card
        className="card-form p-4"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        {/* Botón Volver a Productos */}
        <Button
          variant="outline-secondary"
          onClick={() => navegar("/productos")}
          className="btn-volver mb-3 w-100"
        >
          🔙 Volver a Productos
        </Button>

        <h4 className="text-center mb-4">Agregar Producto</h4>

        {/* Mensaje de error */}
        <div className="form-message">{loading && <p>Cargando...</p>}</div>

        <Form onSubmit={handleSubmit}>
          {/* Nombre del producto */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Nombre</Form.Label>
            <Form.Control
              id="name"
              type="text"
              name="name"
              placeholder="Ej: Zapatillas"
              value={producto.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* URL de la imagen */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="imagen">URL de la Imagen</Form.Label>
            <Form.Control
              id="imagen"
              type="text"
              name="imagen"
              placeholder="https://..."
              value={producto.imagen}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Precio */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="price">Precio</Form.Label>
            <Form.Control
              id="price"
              type="number"
              name="price"
              placeholder="Ej: 199.99"
              value={producto.price}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>

          {/* Descripción */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Descripción</Form.Label>
            <Form.Control
              id="description"
              as="textarea"
              name="description"
              placeholder="Describe el producto"
              value={producto.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </Form.Group>

          {/* Botones de acción */}
          <div className="d-flex justify-content-between flex-column flex-sm-row gap-3">
            <Button
              type="submit"
              variant="success"
              disabled={loading}
              className="btn-submit w-100"
            >
              {loading ? "Cargando..." : "Agregar Producto"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default FormularioProductoFirebase;
