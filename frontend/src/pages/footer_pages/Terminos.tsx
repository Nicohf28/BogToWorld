import "./Ajustes.css";

export default function Terminos() {
  return (
    <div className="ajustes-container">
      <h1>Términos y condiciones</h1>
      <p>Lee los términos y condiciones que regulan el uso de BogToWorld.</p>

      <section className="ajustes-section">
        <h3>1. Uso de la plataforma</h3>
        <ul>
          <li>Solo usuarios registrados pueden dejar reseñas y marcar favoritos.</li>
          <li>No se permite el uso de información con fines comerciales sin autorización.</li>
          <li>Se debe respetar la propiedad intelectual de los contenidos.</li>
        </ul>
      </section>

      <section className="ajustes-section">
        <h3>2. Responsabilidades del usuario</h3>
        <ul>
          <li>Proporcionar información veraz en el registro y en reseñas.</li>
          <li>No publicar contenido ofensivo, ilegal o spam.</li>
          <li>Respetar los derechos de otros usuarios y terceros.</li>
        </ul>
      </section>

      <section className="ajustes-section">
        <h3>3. Privacidad y seguridad</h3>
        <p>
          Los datos personales se manejan según nuestra Política de Privacidad.
          Cada usuario es responsable de mantener segura su cuenta y contraseña.
        </p>
      </section>

      <section className="ajustes-section">
        <h3>4. Modificaciones</h3>
        <p>
          BogToWorld se reserva el derecho de modificar estos términos en cualquier
          momento, notificando a los usuarios cuando sea necesario.
        </p>
      </section>
    </div>
  );
}
