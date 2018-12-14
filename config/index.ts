export interface IConfig {
  port: number;
}

let config: IConfig;

switch (process.env.NODE_ENV) {
  case 'development':
    config = require('./config.dev');
    break;
  case 'production':
    config = require('./config.prod');
    break;
  default:
    config = require('./config.default');
    break;
}

export default config;
