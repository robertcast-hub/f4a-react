// Punto de entrada de Karma: configura el entorno común y carga todos los *.spec.js(x) de src/

// Aislamiento: cada prueba parte con localStorage vacío (la "base de datos" vuelve a los datos semilla)
beforeEach(() => {
  window.localStorage.clear();
});

const context = import.meta.webpackContext('../', {
  recursive: true,
  regExp: /\.spec\.jsx?$/,
});
context
  .keys()
  .filter((key) => !key.includes('test/index'))
  .forEach(context);
