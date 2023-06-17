import Router from 'koa-router'
const router = new Router()
const api = new Router()

import testRoutes from './testRoutes'
import userRoutes from './userRoutes'
import addressRoutes from './addressRoutes'

api.use(testRoutes)
api.use(userRoutes)
api.use(addressRoutes)

router.use('/api/v1', api.routes())
  

export default router