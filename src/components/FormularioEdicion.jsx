import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { Card, Container, Form, Button } from "react-bootstrap"; // Card, Form, Button de Bootstrap
import "../styles/FormularioEdicion.css"; // Mantenemos los estilos adicionales

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProductoFirebase, productoEncontrado, editarProductoF } =
    useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navegar = useNavigate();

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
    <Container className="form-container my-4 d-flex justify-content-center">
      <Card
        className="card-form p-4"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        {/* Botón "Volver" por encima del título */}
        <Button
          variant="outline-secondary"
          onClick={() => navegar("/productos")}
          className="btn-volver mb-3 w-100"
        >
          🔙 Volver a Productos
        </Button>

        <h4 className="text-center mb-4">Editar Producto</h4>

        {/* Mensaje de error si el producto no se encuentra */}
        {error && <div className="error-message mb-3">{error}</div>}

        {/* Verifica que el producto esté cargado antes de mostrar el formulario */}
        {cargando ? (
          <div>Cargando...</div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Nombre:</Form.Label>
              <Form.Control
                id="name"
                type="text"
                name="name"
                value={producto.name || ""}
                onChange={handleChange}
                required
                placeholder="Ej: Camiseta"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="imagen">URL de la Imagen:</Form.Label>
              <Form.Control
                id="imagen"
                type="text"
                name="imagen"
                value={producto.imagen || ""}
                onChange={handleChange}
                required
                placeholder="https://..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="price">Precio:</Form.Label>
              <Form.Control
                id="price"
                type="number"
                name="price"
                value={producto.price || ""}
                onChange={handleChange}
                required
                min="0"
                placeholder="Ej: 199.99"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Descripción:</Form.Label>
              <Form.Control
                id="description"
                as="textarea"
                name="description"
                value={producto.description || ""}
                onChange={handleChange}
                required
                placeholder="Describe el producto"
                rows={3}
              />
            </Form.Group>

            {/* Botones de acción */}
            <div className="d-flex justify-content-between flex-column flex-sm-row gap-3">
              <Button
                type="submit"
                variant="success"
                disabled={cargando}
                className="btn-submit w-100"
              >
                {cargando ? "Cargando..." : "Actualizar Producto"}
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </Container>
  );
}

export default FormularioEdicion;
