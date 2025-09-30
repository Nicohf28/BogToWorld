// frontend/src/pages/footer_pages/FAQ.tsx
export default function FAQ() {
  return (
    <div className="my-4">
      <h1>Preguntas Frecuentes (FAQ)</h1>

      <section className="mb-4">
        <h3>Cuenta de usuario</h3>
        <ul>
          <li><strong>¿Cómo me registro?</strong> Haz clic en “Registrarse” y completa el formulario.</li>
          <li><strong>¿Puedo cambiar mi contraseña?</strong> Ve a Ajustes Contraseña y actualiza tu información.</li>
          <li><strong>¿Cómo cerrar sesión?</strong> Haz clic en “Mi cuenta” Cerrar sesión.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3>Lugares y favoritos</h3>
        <ul>
          <li><strong>¿Cómo marcar un lugar como favorito?</strong> Haz clic en el corazón de la tarjeta del lugar.</li>
          <li><strong>¿Dónde veo mis favoritos?</strong> En la página “Mis Favoritos”.</li>
          <li><strong>¿Puedo dejar reseñas?</strong> Sí, solo si estás logueado.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3>Reseñas y reportes</h3>
        <ul>
          <li><strong>¿Cómo dejar una reseña?</strong> Selecciona un lugar y completa el formulario de reseña.</li>
          <li><strong>¿Puedo reportar errores?</strong> Usa la opción “Reportar un error” en el footer.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3>Soporte y contacto</h3>
        <ul>
          <li><strong>Centro de soporte:</strong> Contacta al equipo si tienes problemas con la app.</li>
          <li><strong>Preguntas frecuentes:</strong> Consulta esta página para resolver dudas rápidas.</li>
        </ul>
      </section>
    </div>
  );
}
