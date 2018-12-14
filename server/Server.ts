import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import Router from 'koa-decorator-ts/router';

class Server extends Koa {
  public routers: Router[] = [];
  async init() {
    this.routers.push(
      new Router({
        dir: `${__dirname}/controllers/`,
        prefix: '/api',
      })
    );

    this.routers.push(
      new Router({
        dir: `${__dirname}/pages/`,
      })
    );

    this.applyMiddleware();

    return this;
  }

  applyMiddleware() {
    this.use(bodyParser());
    this.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });
    for (const router of this.routers) {
      this.use(router.routes());
      this.use(router.allowedMethods());
    }
  }
}

export default Server;
