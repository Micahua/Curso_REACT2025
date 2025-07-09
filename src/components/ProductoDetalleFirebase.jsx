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
      {/* Imagen del producto */}
      <div className="detalle-imagen-container">
        <img
          className="detalle-imagen"
          src={productoEncontrado.imagen}
          alt={productoEncontrado.name}
        />
      </div>

      {/* Info del producto */}
      <div className="detalle-info">
        {/* Botón Volver */}
        <button className="btn-volver" onClick={() => navegar(-1)}>
          🔙 Volver
        </button>

        <h2 className="detalle-titulo">{productoEncontrado.name}</h2>
        <p className="detalle-descripcion">{productoEncontrado.description}</p>

        <p className="detalle-precio">
          Precio:
          <span>
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(productoEncontrado.price)}
          </span>
        </p>

        {/* Contador */}
        <div className="detalle-contador">
          <button onClick={restarContador}>−</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>

        {/* Acciones */}
        <div className="detalle-acciones">
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
    </div>
  );
}

export default ProductoDetalleFirebase;
