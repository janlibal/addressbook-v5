
import config from '../config'
import { IContext } from '../interfaces/IContext'

export function test(ctx: IContext){

  ctx.body = {
    status: 'success',
    message: 'Test route works fine.'
  }

}


