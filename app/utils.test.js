// app/utils.test.js
const { validarTexto, formatearTitulo } = require('./utils');

describe('Pruebas de funciones del CMS', () => {
  test('Validar que un texto vacío o nulo devuelva falso', () => {
    expect(validarTexto("")).toBe(false);
    expect(validarTexto(null)).toBe(false);
    expect(validarTexto("   ")).toBe(false);
  });

  test('Validar que un texto válido devuelva verdadero', () => {
    expect(validarTexto("Proyecto CMS")).toBe(true);
  });

  test('Formatear título a mayúsculas y sin espacios extra', () => {
    expect(formatearTitulo("  hola mundo  ")).toBe("HOLA MUNDO");
  });
});