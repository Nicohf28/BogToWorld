// frontend/src/pages/footer_pages/Soporte.tsx

export default function Soporte() {
  return (
    <div className="my-4">
      <h1>Centro de soporte</h1>
      <p>En esta sección puedes encontrar ayuda para usar BogToWorld y resolver problemas comunes.</p>

      <section className="mb-4">
        <h3>Cómo contactar al soporte</h3>
        <ul>
          <li>Formulario de contacto disponible en la sección de soporte.</li>
          <li>Correo electrónico: <strong>soporte@bogtoworld.com</strong></li>
          <li>Chat en línea (disponible en horario de atención).</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3>Problemas comunes</h3>
        <ul>
          <li>No puedo iniciar sesión.</li>
          <li>Los lugares o reseñas no cargan correctamente.</li>
          <li>El sistema no registra mis favoritos.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3>Preguntas frecuentes</h3>
        <p>Revisa la sección FAQ antes de contactar al soporte, muchas dudas se resuelven allí.</p>
      </section>
    </div>
  );
}
