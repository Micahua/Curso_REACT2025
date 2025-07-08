import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

function NavBoostrap() {
  const { productosCarrito } = useContext(CarritoContext);
  const { admin } = useAuthContext();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mi Tienda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
            {/* 
            <Nav.Link as={Link} to="/BasicExample">
              BasicExample
            </Nav.Link>
            */}
            {admin && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
            {admin && (
              <Nav.Link as={Link} to="/admin/agregarProductos">
                Agregar productos
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito">
              <FaShoppingCart style={{ marginRight: "5px" }} />
              {productosCarrito.length > 0 && (
                <Badge bg="light" text="dark">
                  {productosCarrito.length}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBoostrap;
