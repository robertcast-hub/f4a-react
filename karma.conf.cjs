// karma.conf.cjs
// Configuración del entorno de pruebas: Karma (test runner) + Jasmine (framework de pruebas).
// Karma abre un navegador real (Chrome Headless), carga los archivos *.spec.js(x)
// compilados con Webpack + Babel (para entender JSX) y reporta los resultados.
// La cobertura se mide con babel-plugin-istanbul y se reporta con karma-coverage.

const path = require('path');

module.exports = function (config) {
  config.set({
    // Framework de pruebas
    frameworks: ['jasmine', 'webpack'],

    // Punto de entrada: un único archivo que importa todos los *.spec.js(x)
    files: [
      { pattern: 'src/test/index.spec.js', watched: false },
      // Las imágenes de /public se sirven para que los componentes no generen errores 404
      { pattern: 'public/**/*', included: false, served: true, watched: false },
    ],
    proxies: { '/imagenes/': '/base/public/imagenes/' },

    // Antes de enviarse al navegador, el archivo se compila con Webpack
    preprocessors: {
      'src/test/index.spec.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          // El proyecto es "type": "module": permite importar sin escribir la extensión (.js/.jsx)
          { test: /\.m?jsx?$/, resolve: { fullySpecified: false } },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '120' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // Instrumenta el código fuente (no los tests) para medir cobertura
                plugins: [
                  [
                    'istanbul',
                    {
                      exclude: ['**/*.spec.js', '**/*.spec.jsx', 'src/test/**'],
                    },
                  ],
                ],
              },
            },
          },
          // Los .css importados por componentes se ignoran en pruebas
          { test: /\.css$/, use: 'null-loader' },
        ],
      },
    },

    // Reportes: detalle por prueba en consola + cobertura
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        { type: 'html', subdir: 'html' },          // abrir coverage/html/index.html
        { type: 'text-summary' },                  // resumen en consola
        { type: 'text' },                          // tabla por archivo en consola
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
      ],
      // Umbral mínimo: si la cobertura baja de estos valores, `npm test` falla
      check: {
        global: { statements: 85, branches: 80, functions: 85, lines: 85 },
      },
    },

    specReporter: { suppressSkipped: true, showSpecTiming: true },

    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu'],
      },
    },

    client: {
      jasmine: { random: false }, // orden fijo: resultados reproducibles
      clearContext: false,
    },

    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
  });
};
