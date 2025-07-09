import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { AuthContext } from "../contexts/AuthContext.jsx";
import CarritoCardBootstrap from "./CarritoCardBootstrap";
import "../styles/CarritoBootstrap.css"; // Nuevo archivo para personalizaciones

function CarritoBootstrap() {
  const { user } = useContext(AuthContext);
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } =
    useContext(CarritoContext);

  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + producto.price * producto.cantidad,
    0
  );

  function funcionDisparadora(id) {
    borrarProductoCarrito(id);
  }

  function funcionDisparadora2() {
    vaciarCarrito();
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="carrito-container">
      <Row className="mb-4">
        <Col>
          <h2 className="carrito-titulo">🛒 Carrito de compras</h2>
        </Col>
        <Col xs="auto">
          {productosCarrito.length > 0 && (
            <Button
              variant="danger"
              onClick={funcionDisparadora2}
              className="btn-vaciar"
            >
              Vaciar carrito
            </Button>
          )}
        </Col>
      </Row>

      {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => (
          <CarritoCardBootstrap
            key={producto.id}
            producto={producto}
            funcionDisparadora={funcionDisparadora}
          />
        ))
      ) : (
        <p className="carrito-vacio">El carrito está vacío.</p>
      )}

      {total > 0 && (
        <h4 className="carrito-total text-end">
          Total a pagar:{" "}
          <span className="total-dinero">
            {total.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </span>
        </h4>
      )}
    </Container>
  );
}

export default CarritoBootstrap;
