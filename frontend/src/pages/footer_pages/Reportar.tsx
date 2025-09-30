// frontend/src/pages/footer_pages/Reportar.tsx

export default function Reportar() {
  return (
    <div className="my-4">
      <h1>Reportar un error</h1>
      <p>Si encuentras un fallo o error en BogToWorld, por favor infórmanos para poder solucionarlo.</p>

      <section className="mb-4">
        <h3>Pasos para reportar</h3>
        <ol>
          <li>Describe el problema con detalle.</li>
          <li>Incluye capturas de pantalla si es posible.</li>
          <li>Indica la página o sección donde ocurrió.</li>
          <li>Envía tu reporte a través del formulario de soporte o correo de contacto.</li>
        </ol>
      </section>

      <section className="mb-4">
        <h3>Tipos de problemas comunes</h3>
        <ul>
          <li>Errores al cargar lugares o reseñas.</li>
          <li>Problemas con la autenticación o cuenta de usuario.</li>
          <li>Fallas en la visualización de la interfaz.</li>
          <li>Contenido duplicado o incorrecto.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3>Contacto</h3>
        <p>Puedes enviarnos un correo a <strong>soporte@bogtoworld.com</strong> o usar el formulario en la sección "Centro de soporte".</p>
      </section>
    </div>
  );
}
