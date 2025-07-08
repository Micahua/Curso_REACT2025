import { useState } from "react";
import "../styles/Productos.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CardProducto({ producto }) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={producto.imagen}
        style={{ maxHeight: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{producto.name}</Card.Title>
        <Link to={"/productosF/" + producto.id}>
          <Button
            variant="primary"
            style={{
              backgroundColor: "#4A8E4B", // Verde suave
              borderColor: "#4A8E4B", // Bordes con el mismo verde
              color: "white", // Texto blanco
            }}
          >
            Detalles del producto
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CardProducto;
