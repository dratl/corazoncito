/*
// Este script construye dinámicamente una dirección de correo electrónico
document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById("email-link");
  if (link) link.setAttribute("rel", "noopener");
});
// para evitar que sea fácilmente detectada por bots de spam.
  // Definimos las partes del correo
  const user = "xico.trujano";
  const domain = "proton.me";
  const email = user + "@" + domain;

  // Construimos dinámicamente el enlace
  const link = document.getElementById("email-link");
  link.href = "mailto:" + email;

  // Insertamos el texto visible
  document.getElementById("email-text").textContent = email;
  */

  // Este script construye dinámicamente una dirección de correo electrónico
document.addEventListener('DOMContentLoaded', () => {
  // Definimos las partes del correo
  const user = "xico.trujano";
  const domain = "proton.me";
  const email = `${user}@${domain}`;

  // Para todos los enlaces con la clase "email-link"
  document.querySelectorAll(".email-link").forEach(link => {
    link.setAttribute("rel", "noopener");
    link.href = "mailto:" + email;

    const span = link.querySelector(".email-text");
    if (span) span.textContent = email;
  });
});