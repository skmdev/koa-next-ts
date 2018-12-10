import { Context } from 'koa';
import { Controller, Route } from 'koa-decorator-ts';

@Controller('/aa')
class B {
  @Route.get('/test')
  public static async aaaa(ctx: Context) {
    ctx.body = { foo: 'bar' };
  }
}

export default B;
