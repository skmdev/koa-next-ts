const path = require('path');
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
      [
        withTypescript,
        {
          webpack: (config, { defaultLoaders }) => {
            // reference: https://github.com/zeit/next.js/issues/5666
            // NOTE(swatinem): we just assume the typescript loader is configured last
            const tsxRules =
              config.module.rules[config.module.rules.length - 1];

            // By default next-typescript only includes things in the app root for no real reason -_-
            // See: https://github.com/zeit/next-plugins/blob/be21851f63e82845387e576f5f2ed3e5c448cb97/packages/next-typescript/index.js#L51
            // See: https://github.com/zeit/next-plugins/issues/234
            tsxRules.include = undefined;

            // Also, apparently babel does not search for the `.babelrc` based on the `root`
            // option correctly when the file to transpile is outside of the root.
            // See: https://babeljs.io/docs/en/options#root
            // So we just pass a path to the babelrc manually here
            defaultLoaders.babel.options.configFile = path.join(
              __dirname,
              '.babelrc'
            );
            return config;
          },
        },
      ],
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
