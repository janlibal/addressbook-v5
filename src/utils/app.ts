import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import koaCompress from 'koa-compress'
import koaHelmet  from 'koa-helmet'
import cors from '@koa/cors'
import koaLogger from 'koa-logger'
import router from '../routes'
import errorHandler from '../middleware/errorHandler'

import logger from '../utils/logger'


const app = new Koa()

app.use(errorHandler)
/*app.on('error', (error, ctx) => {
  logger.warn(error)
})*/

/*app.on('error', (err, ctx) => {
   centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  
})*/


app.use(koaHelmet())
app.use(koaCompress())
app.use(koaBody())
app.use(koaLogger())
app.use(cors())
app.use(
  bodyParser({
    enableTypes: ["json"],
  }),
)
app.use(router.routes())
app.use(router.allowedMethods())

export default app

    
