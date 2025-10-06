import "./Ajustes.css";

export default function Reportar() {
  return (
    <div className="ajustes-container">
      <h1>Reportar un error</h1>
      <p>
        Si encuentras un fallo o error en <strong>BogToWorld</strong>, por favor
        infórmanos para poder solucionarlo.
      </p>

      <section className="ajustes-section">
        <h3>Pasos para reportar</h3>
        <ul>
          <li><strong>1.</strong> Describe el problema con detalle.</li>
          <li><strong>2.</strong> Incluye capturas de pantalla si es posible.</li>
          <li><strong>3.</strong> Indica la página o sección donde ocurrió.</li>
          <li>
            <strong>4.</strong> Envía tu reporte a través del formulario de soporte o
            correo de contacto.
          </li>
        </ul>
        <p>
          Para realizar tu reporte, ingresa al siguiente formulario:{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdD5yV7MlQIjbUMd6H7x1z3fw7qLNi-ULHWRTSuz8M0OxYbLg/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            click aquí
          </a>
        </p>
      </section>

      <section className="ajustes-section">
        <h3>Tipos de problemas comunes</h3>
        <ul>
          <li>Errores al cargar lugares o reseñas.</li>
          <li>Problemas con la autenticación o cuenta de usuario.</li>
          <li>Fallas en la visualización de la interfaz.</li>
          <li>Contenido duplicado o incorrecto.</li>
        </ul>
      </section>

      <section className="ajustes-section">
        <h3>Contacto</h3>
        <p>
          Puedes enviarnos un correo a <strong>soporte@bogtoworld.com</strong> o
          usar el formulario en la sección “Centro de soporte”.
        </p>
      </section>
    </div>
  );
}
