import { IContext } from "../interfaces/IContext"
import * as errors from '../utils/errors'


async function errorHandler(ctx: IContext, next: () => Promise<any>) {
    try {
        await next()
    } catch (error: any) {
        ctx.status =  error.status
        error.status = ctx.status
        ctx.body = { error }
        ctx.app.emit('error:', error, ctx)
    }
}
export default errorHandler

