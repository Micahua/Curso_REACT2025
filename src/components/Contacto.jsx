function Contacto() {
  return (
    <section
      style={{
        backgroundColor: "#fdfcf8", // fondo neutro, en línea con el detalle
        padding: "40px 20px",
        maxWidth: "900px",
        margin: "40px auto",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
        color: "#333",
        lineHeight: "1.6",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "#5e7254",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        Contacto
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Información de contacto */}
        <div style={{ flex: "1 1 300px" }}>
          <p>
            <strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a
            18:00 hs.
          </p>
          <p>
            <strong>WhatsApp:</strong>{" "}
            <a
              href="https://wa.me/541151843564"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff7f50", textDecoration: "none" }}
            >
              (11) 5184-3564
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:OrfeuContacto@gmail.com"
              style={{ color: "#ff7f50", textDecoration: "none" }}
            >
              OrfeuContacto@gmail.com
            </a>
          </p>
        </div>

        {/* Imagen de contacto */}
        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          <img
            src="https://i.postimg.cc/TYt2NpDd/CONTACTO.jpg"
            alt="Imagen de contacto"
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
            }}
          />
        </div>
      </div>

      {/* Mensaje final */}
      <p
        style={{
          textAlign: "center",
          fontSize: "1.1rem",
          marginTop: "30px",
          color: "#444",
          fontWeight: "bold",
        }}
      >
        No dude en contactarnos ante cualquier consulta, sugerencia o
        comentario. ¡Será un placer atenderle!
      </p>
    </section>
  );
}

export default Contacto;
