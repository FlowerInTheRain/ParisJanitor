const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {

      // Déterminer l'environnement basé sur NODE_ENV
      const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
      const envConfig = dotenv.config({path: envFile}).parsed;

      // Ajouter les variables d'environnement au DefinePlugin
      const envVariables = Object.keys(envConfig).reduce((acc, key) => {
        acc[`process.env.${key}`] = JSON.stringify(envConfig[key]);
        return acc;
      }, {});

      // Configuration du plugin
      config.plugins.push(
          new webpack.DefinePlugin({
            ...envVariables,
            '__VUE_OPTIONS_API__': JSON.stringify(envConfig.VUE_OPTIONS_API === 'true'),
            '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(envConfig.VUE_PROD_HYDRATION_MISMATCH_DETAILS === 'true')
          })
      );
  },
})
