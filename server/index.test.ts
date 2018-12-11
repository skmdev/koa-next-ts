import request from 'supertest';
import Server from './Server';
import { setupSSR } from './SSR';

let app;
const server = new Server();

beforeAll(async () => {
  await server.init();
  await setupSSR(server);
  app = await server.listen(999);
});

describe('Server', () => {
  afterEach(() => {
    app.close();
  });

  it('gaga', async () => {
    const response = await request(app).get('/api/user/unknown/route');
    expect(response.status).toBe(404);
    // expect(response.text).toBe('haha');
  });
});
