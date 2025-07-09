import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductoDetalle() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } =
    useProductosContext();

  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => {
        setCargando(false);
      })
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        } else if (error === "Hubo un error al obtener el producto.") {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  const funcionCarrito = () => {
    if (cantidad < 1) return;
    dispararSweetBasico(
      "Producto Agregado",
      "El producto fue agregado al carrito con éxito",
      "success",
      "Cerrar"
    );
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  };

  const dispararEliminar = () => {
    eliminarProducto(id)
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
  };

  const sumarContador = () => setCantidad(cantidad + 1);

  const restarContador = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

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
      <div className="detalle-info">
        {/* Botón Volver */}
        <button className="btn-volver" onClick={() => navegar(-1)}>
          🔙 Volver
        </button>

        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>
        <p>{productoEncontrado.price} $</p>

        {/* Contador de cantidad */}
        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>

        {/* Acciones basadas en el rol de administrador */}
        {admin ? (
          <Link to={`/admin/editarProducto/${id}`}>
            <button className="btn-editar">Editar producto</button>
          </Link>
        ) : (
          <button onClick={funcionCarrito} className="btn-agregar">
            Agregar al carrito
          </button>
        )}

        {admin && (
          <button onClick={dispararEliminar} className="btn-eliminar">
            Eliminar Producto
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductoDetalle;
