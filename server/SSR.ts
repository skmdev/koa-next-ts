import Koa from 'koa';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const dir = dev ? './client' : '';

export async function setupSSR(app: Koa, options: next.ServerOptions = {}) {
  const nextApp = next({ dev, dir, ...options });

  await nextApp.prepare();

  app.context.next = nextApp;
}
