import { Next } from "koa"
import { IContext } from "../interfaces/IContext"
import userOperations from "../operations/userOperations"
import validate from "../validations"
import schema from '../validations/schemas/userSchema'
import * as errors from '../utils/errors'



async function parseHeader(hdrValue:string) {

  if (!hdrValue || typeof hdrValue !== 'string') {
    return null
  }

  const matches = hdrValue.match(/(\S+)\s+(\S+)/u)
    
  const data =  matches && {
    scheme: matches[0],
    value: matches[1],
  }

  return data
}


async function getAuthPayload(authorization:string) {
  const parsedHeader = await parseHeader(authorization)
      
  if (!parsedHeader
    || !parsedHeader.value
    || !parsedHeader.scheme
    //|| parsedHeader.scheme.toLowerCase() !== 'jwt'
    || parsedHeader.value.toLowerCase() !== 'jwt' 
  ) {
    return null
  }

  const token = parsedHeader.scheme.replace('jwt ', '')

  validate(schema.jwtToken, token)
  
  const data = await userOperations.verifyTokenPayload(token)

  return data
   
 }


export async function authenticate(ctx:IContext, next:Next) {

  if (!ctx) {
    throw new Error('Context has to be defined')
  }

  const jwtToken = ctx.header.authorization!

  const data = await getAuthPayload(jwtToken)
  if (!data) {
    throw new errors.InvalidToken()
  }

  if (ctx.response && data.loginTimeout) {
    ctx.set('Login-timeout', data.loginTimeout.toString())
  }

  ctx.state.user = data
  ctx.state.userId = data.user.id

  return next()
}


