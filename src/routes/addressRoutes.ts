import Router from "koa-router"
import { address  } from "../controllers/addressController"
import { authenticate } from "../middleware/authentication"

const router = new Router()

router.post('/address', authenticate, address)

export default router.routes()