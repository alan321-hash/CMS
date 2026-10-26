// app/utils.js
function validarTexto(texto) {
  if (!texto || texto.trim() === "") {
    return false;
  }
  return true;
}

function formatearTitulo(titulo) {
  return titulo.trim().toUpperCase();
}

module.exports = { validarTexto, formatearTitulo };