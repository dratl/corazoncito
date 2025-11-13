// Este script construye dinámicamente una dirección de correo electrónico
// para evitar que sea fácilmente detectada por bots de spam.
  // Definimos las partes del correo
  const user = "xico.trujano";
  const domain = "proton.me";
  const email = user + "@" + domain;

  // Construimos dinámicamente el enlace
  const link = document.getElementById("email-link");
  link.href = "mailto:" + email;

  // Insertamos el texto visible
  document.getElementById("email-text").textContent = user;