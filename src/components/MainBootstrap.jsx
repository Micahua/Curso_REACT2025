import { Container, Row, Col, Image } from "react-bootstrap";

function MainBootstrap() {
  return (
    <Container className="my-4">
      <Row className="align-items-center">
        <Col xs={12} md={4} lg={4}>
          <Image
            src="https://i.postimg.cc/q7R3DPRY/FONDO-ORFEU.jpg"
            alt="Imagen ilustrativa"
            fluid
            rounded
          />
        </Col>
        <Col xs={12} md={4} lg={4}>
          <h2>Bienvenidos al Mundo "Orfeu"</h2>
          <p className="display-8 text-center text-dark">
            Un Café que transforma cada sorbo en una experiencia única.
          </p>
        </Col>
        <Col md={4}>
          <Image
            src="https://i.postimg.cc/q7R3DPRY/FONDO-ORFEU.jpg"
            alt="Imagen ilustrativa"
            fluid
            rounded
          />
        </Col>
      </Row>
    </Container>
  );
}

export default MainBootstrap;
