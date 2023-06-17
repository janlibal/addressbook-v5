import userRepository from "../repositories/userRepository"
import logger from "../utils/logger"
import * as errors from '../utils/errors'
import crypto from "../utils/crypto"

async function create(input: any) {
    
    logger.info('create user started')

    const data = {
        email: input.email,
        name: input.name,
        password: await crypto.hashPassword(input.password),
    }

    const user = await userRepository.findByEmail(data.email)
        
    if (user) {
      logger.info('Resource already exists')
      throw new errors.ResourceAlreadyExists()
    }

    let createdUser: any
    createdUser = await userRepository.saveUser(data)

    createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)
        
    logger.info('create user finished')
        
    return {
        id: createdUser.id,
        email: createdUser.email,
        token: createdUser.accessToken
    }
    
}


async function login(input: any) {

    logger.info('login started')

    const data = {
        email: input.email.toLowerCase(),
        password: input.password

    }
            
    const user = await userRepository.findByEmail(data.email)
   
    if (!user) {
        logger.info('Unauthorized')
        throw new errors.Unauthorized()
    }
        
    const verified = await crypto.comparePasswords(data.password, user.password)
    
    if (!verified) {
        logger.info('Unauthorized')
        throw new errors.Unauthorized()
    }
        
    const token = await crypto.generateAccessToken(user.id)
        
    logger.info('login finished')

    return {
        id: user.id,
        email: user.email,
        token,
      }
    
    
}

async function verifyTokenPayload(token:any) {
    logger.info({ token }, 'verifyTokenPayload started')
    
    let jwtPayload:any
    jwtPayload = await crypto.verifyToken(token)
    
    const now = Date.now()
    if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
      throw new errors.Unauthorized()
    }
  
    const userId = jwtPayload.userId
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new errors.Unauthorized()
    }
    logger.info('verifyTokenPayload finished')

    return {
      user,
      loginTimeout: jwtPayload.exp * 1000,
    }
  }


export default { 
    create,
    login,
    verifyTokenPayload
}