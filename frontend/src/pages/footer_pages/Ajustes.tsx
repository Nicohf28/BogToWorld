
import React from "react";
import "./Ajustes.css";

export default function Ajustes() {
  return (
    <div className="ajustes-container">
      <h1>Ajustes de Usuario</h1>
      <p>Desde aquí puedes administrar tu cuenta y personalizar tu experiencia en <strong>BogToWorld</strong>.</p>

      <div className="ajustes-section">
        <h3>Información personal</h3>
        <p>Actualiza tu información personal, incluyendo correo electrónico, nombre y foto de perfil.</p>
        <ul>
          <li>Cambiar nombre y apellido</li>
          <li>Actualizar correo electrónico</li>
          <li>Subir o cambiar foto de perfil</li>
        </ul>
      </div>

      <div className="ajustes-section">
        <h3>Contraseña y seguridad</h3>
        <p>Mantén tu cuenta segura cambiando tu contraseña regularmente y habilitando la autenticación de dos factores si está disponible.</p>
        <ul>
          <li>Cambiar contraseña</li>
          <li>Configurar preguntas de seguridad</li>
          <li>Activar/desactivar notificaciones de seguridad</li>
        </ul>
      </div>

      <div className="ajustes-section">
        <h3>Preferencias</h3>
        <p>Personaliza cómo quieres recibir información y cómo quieres interactuar con la app.</p>
        <ul>
          <li>Notificaciones por correo electrónico</li>
          <li>Notificaciones en la app</li>
          <li>Idioma preferido</li>
          <li>Temas visuales (modo claro/oscuro)</li>
        </ul>
      </div>

      <div className="ajustes-section">
        <h3>Privacidad</h3>
        <p>Controla quién puede ver tus actividades, favoritos y reseñas.</p>
        <ul>
          <li>Visibilidad de favoritos: pública o privada</li>
          <li>Permitir que otros usuarios vean tus reseñas</li>
          <li>Configuración de datos compartidos con terceros</li>
        </ul>
      </div>
    </div>
  );
}
