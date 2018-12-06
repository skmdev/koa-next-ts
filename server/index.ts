import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import Config from '../config';

const port = Config.port;
const dev = process.env.NODE_ENV !== 'production';
const dir = dev ? './client' : '';

const app = next({ dev, dir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pathname === '/a') {
      console.log('22s');
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else if (pathname === '/cc') {
      app.render(req, res, '/cc', query);
    } else if (pathname === '/') {
      app.render(req, res, '/', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
