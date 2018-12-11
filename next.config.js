const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {};
}

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withTypescript = require('@zeit/next-typescript');
    const withLess = require('./next-less');
    const withPlugins = require('next-compose-plugins');

    return withPlugins([
      withTypescript,
      [
        withLess,
        {
          lessLoaderOptions: {
            javascriptEnabled: true,
          },
          cssModules: true,
          cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]',
          },
          nodeModuleLoaderOptions: {
            javascriptEnabled: true,
          },
        },
      ],
      {
        useFileSystemPublicRoutes: false,
        distDir: '../.next',
      },
    ])(phase, { defaultConfig });
  }

  return {};
};
