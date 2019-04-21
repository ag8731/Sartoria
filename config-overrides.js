const BundleTracker = require('webpack-bundle-tracker');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = {
  webpack: (config, env) => {
    config = rewireReactHotLoader(config, env);

    config.plugins.push(
      new BundleTracker({
        path: __dirname,
        filename: './build/webpack-stats.json',
      }),
    );

    config.optimization.splitChunks.name = 'main';

    return config;
  },
};
