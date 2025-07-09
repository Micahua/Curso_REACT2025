import { Button, Card, Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs"; // Ícono para eliminar

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
  return (
    <Card className="carrito-card mb-3">
      <Row noGutters>
        <Col xs={12} sm={4} md={3} className="d-flex justify-content-center">
          <img
            src={producto.imagen}
            alt={producto.name}
            className="carrito-card-imagen"
          />
        </Col>

        <Col xs={12} sm={8} md={9}>
          <Card.Body className="carrito-card-body">
            <Card.Title className="carrito-card-titulo">
              {producto.name}
            </Card.Title>
            <Card.Text className="carrito-card-precio">
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(producto.price)}
            </Card.Text>

            {/* Contador */}
            <div className="carrito-card-contador">
              <span>Cantidad: {producto.cantidad}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => funcionDisparadora(producto.id)}
                className="btn-eliminar"
              >
                <BsTrash />
                Eliminar
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default CarritoCardBootstrap;
