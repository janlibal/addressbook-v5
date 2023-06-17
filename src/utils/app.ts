import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import koaCompress from 'koa-compress'
import koaHelmet  from 'koa-helmet'
import cors from '@koa/cors'
import logger from 'koa-logger'
import router from '../routes'
import errorHandler from '../middleware/errorHandler'


const app = new Koa()

app.use(errorHandler)
app.use(koaHelmet())
app.use(koaCompress())
app.use(koaBody())
app.use(logger())
app.use(cors())
app.use(
  bodyParser({
    enableTypes: ["json"],
  }),
)
app.use(router.routes())
app.use(router.allowedMethods())

export default app

    
