import { Context } from 'koa';
import { Controller, Route, Priority } from 'koa-decorator-ts';

@Controller('/')
class ReactPage {
  @Priority(-1)
  @Route.get('*')
  public static async HandlePage(ctx: Context) {
    const handle = ctx.next.getRequestHandler();
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  }

  @Route.get('/')
  public static async renderIndex(ctx: Context) {
    await ctx.next.render(ctx.req, ctx.res, '/', ctx.query);
    ctx.respond = false;
  }

  @Route.get('/a')
  public static async renderA(ctx: Context) {
    await ctx.next.render(ctx.req, ctx.res, '/a', ctx.query);
    ctx.respond = false;
  }

  @Route.get('/b')
  public static async renderB(ctx: Context) {
    await ctx.next.render(ctx.req, ctx.res, '/b', ctx.query);
    ctx.respond = false;
  }

  @Route.get('/cc')
  public static async renderCC(ctx: Context) {
    await ctx.next.render(ctx.req, ctx.res, '/cc', ctx.query);
    ctx.respond = false;
  }
}

export default ReactPage;
