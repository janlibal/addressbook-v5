import { IContext } from "../interfaces/IContext"
import * as errors from '../utils/errors'


async function errorHandler(ctx: IContext, next: () => Promise<any>) {
    try {
        await next()
    } catch (error: any) {
        /*      
        ctx.status =  error.status
        error.status = ctx.status
        ctx.body = { 'Something went wrong right now:': error }
        ctx.app.emit('error:', error, ctx)
        */

        /*// will only respond with JSON
        ctx.status = error.statusCode || error.status || 500;
        ctx.body = {
            first: error.name,
        message: error.message
        }*/
        ctx.status = error.status || 500
        ctx.body = { 'Something went wrong right now:': error.message }
        ctx.app.emit('error', error, ctx)


    }
}
export default errorHandler

/*

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
})

*/