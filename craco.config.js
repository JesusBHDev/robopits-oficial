// craco.config.js
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new InjectManifest({
        swSrc: './src/custom-service-worker.js', // Archivo fuente del service worker personalizado
        swDest: 'service-worker.js', // Nombre del archivo generado
      }),
    ],
  },
};
