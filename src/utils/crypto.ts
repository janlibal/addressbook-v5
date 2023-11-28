import fs from 'fs'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import config from '../config'

const privateKey = fs.readFileSync(config.auth.privateKeyFile)

const privateSecret = {
    key: privateKey,
    passphrase: config.auth.privteKeyPassPhrase,
}


const signOptions: SignOptions = {
    algorithm: config.auth.createOptions.algorithm, 
    expiresIn: config.auth.createOptions.expiresIn,
    issuer: `${config.auth.createOptions.issuer}.${config.server.environment}`,
}

const publicKey = fs.readFileSync(config.auth.publicKeyFile)
const verifyOptions: VerifyOptions = {
    algorithms: [config.auth.createOptions.algorithm],
    issuer: `${config.auth.createOptions.issuer}.${config.server.environment}`,
}



function hashPassword(password: string) {
    return bcrypt.hash(peperify(password), config.auth.saltRounds)
}

async function generateAccessToken(userId: string) {
    const payload = { userId }
    //return await jwt.sign(payload, privateSecret, signOptions)
    return jwt.sign(payload, config.auth.secret, signOptions)
}

async function verifyToken(token: string) {
    try {
        //---const data = await jwt.verify(token, publicKey, verifyOptions)
        const data = await jwt.verify(token, config.auth.secret, verifyOptions)
        return data
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError || err instanceof SyntaxError) {
            return null
        }
    throw err
    }
}

function comparePasswords(candidatePassword:string, userPassword:string) {
    return bcrypt.compare(peperify(candidatePassword), userPassword)
}


function peperify(password: string) {
    return crypto.createHmac('sha1', config.auth.secret)
      .update(password)
      .digest('hex')
}



export default {
    hashPassword,
    generateAccessToken,
    comparePasswords,
    verifyToken
}