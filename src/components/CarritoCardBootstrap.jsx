import { Button, Card, Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs"; // Ícono para eliminar

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
  return (
    <Card className="mb-3">
      <Row className="g-0 align-items-center">
        <Col xs={12} md={4}>
          <Card.Img src={producto.imagen} />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text>
              Cantidad: {producto.cantidad} <br />
              Precio: ${producto.price}
            </Card.Text>
            <Button
              variant="outline-danger"
              onClick={() => funcionDisparadora(producto.id)}
            >
              Eliminar
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default CarritoCardBootstrap;
