export interface IConfig {
  port: number;
}

let config: IConfig;

switch (process.env.NODE_ENV) {
  case 'development':
    config = require('./config.dev.json');
    break;
  case 'production':
    config = require('./config.prod.json');
    break;
  default:
    config = require('./config.default.json');
    break;
}

export default config;
