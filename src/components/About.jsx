function About() {
  return (
    <section
      style={{
        backgroundColor: "#fdfcf8", // Fondo suave como en contacto/detalle
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "40px auto",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
        color: "#333",
        lineHeight: "1.7",
      }}
    >
      {/* Contenedor principal: imagen lateral + texto */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* Imagen lateral */}
        <div style={{ flex: "1 1 350px" }}>
          <img
            src="https://i.postimg.cc/VvnJx1Xf/TASA-CAFE2.jpg"
            alt="Taza de café"
            style={{
              width: "100%",
              borderRadius: "10px",
              objectFit: "cover",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
            }}
          />
        </div>

        {/* Texto principal */}
        <div style={{ flex: "2 1 500px" }}>
          <h2
            style={{
              color: "#5e7254",
              fontSize: "2rem",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Sobre Nosotros
          </h2>
          <p>
            Orfeu entró en el mercado de cafés especiales en 2005, cultivando
            granos de calidad seleccionada en las altas montañas del sur de
            Minas Gerais, Brasil, un lugar con una tradición de más de 67 años
            en plantaciones de café.
          </p>
          <p>
            El símbolo de la finca es un Jequitibá Rosa de 1.500 años, un árbol
            milenario que simboliza la longevidad, el respeto por la naturaleza,
            la fuerza, la tradición y la historia de Orfeo.
          </p>
          <p>
            Estamos siempre en búsqueda de nuevas certificaciones que puedan
            fortalecer nuestro compromiso con la calidad y garantizar nuestra
            responsabilidad social y ambiental.
          </p>
          <p>En nuestra tienda encontrarás lo que necesites.</p>

          {/* Subtexto con imagen en columnas */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "30px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 300px" }}>
              <p>
                Aquel que se cultiva con el tiempo, con la historia. Destacar el
                conocimiento que genera valor y sabor: en el proceso, en el
                saber hacer, en la unión entre arte, sensibilidad y tecnología,
                en el consumidor conocedor y en la cultura. Estar encantados de
                que descubras y pruebes el mejor café.
              </p>
            </div>

            <div style={{ flex: "1 1 300px" }}>
              <img
                src="https://i.postimg.cc/cHVKk6gk/TASA-CAFE3.jpg"
                alt="Café en grano"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Imagen de pie */}
      <div style={{ marginTop: "40px" }}>
        <img
          src="https://i.postimg.cc/mZH1z3Jv/ORFEO-FOOT-NOSOTROS.jpg"
          alt="Pie de página Orfeo"
          style={{
            width: "100%",
            borderRadius: "10px",
            objectFit: "cover",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
          }}
        />
      </div>
    </section>
  );
}

export default About;
