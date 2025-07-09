import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function Admin() {
  const { admin } = useAuthContext();

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del submit
    alert("Sección en construcción");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow-lg p-4"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Formulario de Administración</h2>
          <Form onSubmit={handleSubmit}>
            {/* Formulario de ingreso */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingrese email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Dirección</Form.Label>
              <Form.Control placeholder="Calle 32 ..." />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Estado</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Elegir...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>CP</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-between">
              <Button variant="outline-secondary" href="/">
                Volver
              </Button>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
