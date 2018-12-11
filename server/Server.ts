import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import Router from 'koa-decorator-ts/router';

class Server extends Koa {
  public routers: Router[] = [];
  async init() {
    this.routers.push(
      new Router({
        dir: '/server/controllers/',
        prefix: '/api',
      })
    );

    this.routers.push(
      new Router({
        dir: `/server/pages/`,
      })
    );

    await this.applyMiddleware();

    return this;
  }

  async applyMiddleware() {
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
