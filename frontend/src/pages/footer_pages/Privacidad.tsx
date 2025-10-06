import "./Ajustes.css";

export default function Privacidad() {
  return (
    <div className="ajustes-container">
      <h1>Política de Privacidad</h1>
      <p>
        En BogToWorld nos comprometemos a proteger tus datos personales y tu
        privacidad.
      </p>

      <section className="ajustes-section">
        <h3>1. Datos que recopilamos</h3>
        <ul>
          <li>Información de cuenta: nombre, correo electrónico y preferencias.</li>
          <li>Datos de interacción: lugares visitados, reseñas y favoritos.</li>
          <li>Datos de uso: métricas de navegación y preferencias de usuario.</li>
        </ul>
      </section>

      <section className="ajustes-section">
        <h3>2. Uso de la información</h3>
        <ul>
          <li>Personalizar la experiencia de usuario.</li>
          <li>Mejorar la plataforma y los servicios.</li>
          <li>Enviar notificaciones relevantes y alertas de interés.</li>
        </ul>
      </section>

      <section className="ajustes-section">
        <h3>3. Protección de datos</h3>
        <p>
          Tomamos medidas técnicas y organizativas para proteger tus datos de
          accesos no autorizados, pérdidas o divulgación.
        </p>
      </section>

      <section className="ajustes-section">
        <h3>4. Compartir información</h3>
        <p>
          No vendemos tus datos personales a terceros. Solo compartimos
          información con proveedores necesarios para ofrecer nuestros servicios.
        </p>
      </section>

      <section className="ajustes-section">
        <h3>5. Derechos del usuario</h3>
        <ul>
          <li>Acceder, rectificar o eliminar tus datos personales.</li>
          <li>Solicitar la limitación oportuna del tratamiento de tus datos.</li>
          <li>Retirar tu consentimiento en cualquier momento.</li>
        </ul>
      </section>
    </div>
  );
}
