import Config from '../config';
import Server from './Server';
import { setupSSR } from './SSR';

const server = new Server();

server.init().then(async (app) => {
  await setupSSR(app);
  await app.listen(Config.port);
  console.log(`> Ready on http://localhost:${Config.port}`);
});
