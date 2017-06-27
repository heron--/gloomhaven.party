module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'gloomhaven-api',
      script    : 'index.js',
      env: {
        NODE_ENV: 'production'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
    {
      name      : 'stage-gloomhaven-api',
      script    : 'index.js',
      env: {
        NODE_ENV: 'stage'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],
};
