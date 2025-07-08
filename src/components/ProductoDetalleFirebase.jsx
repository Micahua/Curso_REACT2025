import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { BiBold } from "react-icons/bi";

function ProductoDetalleFirebase({}) {
  const navegar = useNavigate();

  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const {
    productoEncontrado,
    eliminarProductoFirebase,
    obtenerProductoFirebase,
  } = useProductosContext();

  const { id } = useParams();
  //const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  console.log(id);

  useEffect(() => {
    obtenerProductoFirebase(id)
      .then(() => {
        console.log("test");
        setCargando(false);
      })
      .catch((error) => {
        if (error == "Producto no encontrado") {
          setError("Producto no encontrado");
        }
        if (error == "Hubo un error al obtener el producto.") {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico(
      "Producto Agregado",
      "El producto fue agregado al carrito con éxito",
      "success",
      "Cerrar"
    );
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function dispararEliminar() {
    eliminarProductoFirebase(id)
      .then(() => {
        navegar("/productos");
        dispararSweetBasico(
          "Producto eliminado correctamente",
          "El producto fue eliminado con éxito",
          "success",
          "Cerrar"
        );
      })
      .catch((error) => {
        dispararSweetBasico(
          "Hubo un problema al eliminar el producto",
          error,
          "error",
          "Cerrar"
        );
      });
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img
        className="detalle-imagen"
        src={productoEncontrado.imagen}
        alt={productoEncontrado.name}
      />

      {/* Botón Volver */}
      <button
        className="btn btn-sm mb-3"
        onClick={() => navegar(-1)}
        style={{
          backgroundColor: "#4A8E4B" /* Verde sobrio, en armonía */,
          color: "white",
          borderColor: "#6F4F1F",
        }}
      >
        🔙 Volver
      </button>

      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>

        <p>
          <span
            style={{ fontWeight: "bold", fontSize: "1.25rem", color: "black" }}
          >
            Precio:
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: "black",
              }}
            >
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(productoEncontrado.price)}
            </span>
          </span>
        </p>

        {/* Contador de cantidad */}
        <div className="detalle-contador mb-3">
          <button
            onClick={restarContador}
            className="btn btn-sm"
            style={{
              backgroundColor: "#4A8E4B" /* Verde sobrio, en armonía */,
              color: "white",
              borderColor: "#FF8C00",
            }}
          >
            -
          </button>
          <span className="mx-3">{cantidad}</span>
          <button
            onClick={sumarContador}
            className="btn btn-sm"
            style={{
              backgroundColor: "#4A8E4B" /* Verde sobrio, en armonía */,
              color: "white",
              borderColor: "#FF8C00",
            }}
          >
            +
          </button>
        </div>

        {/* Contenedor para los botones de acción */}
        <div className="d-flex justify-content-between align-items-center">
          {/* Botón Agregar al carrito o Editar producto */}
          {admin ? (
            <Link to={"/admin/editarProducto/" + id}>
              <button
                className="btn"
                style={{
                  backgroundColor: "#4A8E4B" /* Verde sobrio, en armonía */,
                  color: "white",
                  borderColor: "#D85E1E",
                }}
              >
                Editar producto
              </button>
            </Link>
          ) : (
            <button
              onClick={funcionCarrito}
              className="btn"
              style={{
                backgroundColor: "#3E2723", // Marrón oscuro
                color: "white",
                borderColor: "#D85E1E",
              }}
            >
              Agregar al carrito
            </button>
          )}

          {/* Botón Eliminar producto (solo si es admin) */}
          {admin && (
            <button
              onClick={dispararEliminar}
              className="btn"
              style={{
                backgroundColor: "#3E2723", // Marrón oscuro
                color: "white",
                borderColor: "#3E2723",
              }}
            >
              Eliminar Producto
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalleFirebase;
