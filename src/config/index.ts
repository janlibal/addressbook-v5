import dotenvExtended from 'dotenv-extended'
import dotenvParseVariables from 'dotenv-parse-variables'
import { IConfig } from '../interfaces/IConfig'
import * as pack from '../../package.json'

const env = dotenvExtended.load({
    path: process.env.ENV_FILE, 
    defaults: './src/config/env/.env.defaults',
    schema: './src/config/env/.env.schema',
    includeProcessEnv: true,
    silent: false,
    errorOnMissing: true,
    errorOnExtra: true,
})

const parsedEnv = dotenvParseVariables(env)

const config: IConfig = {
    appName: pack.name as string,
    nodeVer: pack.engines.node as string,
    debugLogging: parsedEnv.DEBUG_LOGGING as boolean,
    pinoMinLevel: parsedEnv.PINO_MIN_LEVEL as string,
    pinoEnabled: parsedEnv.PINO_ENABLED as boolean,
    server: {
        port: parsedEnv.PORT as string,
        environment: parsedEnv.ENVIRONMENT as string,
        bodyParser: {
            patchKoa: parsedEnv.PATCH_KOA as boolean,
            urlencoded: parsedEnv.URL_ENCODED as boolean,
            text: parsedEnv.TEXT as boolean,
            json: parsedEnv.JSON as boolean,
            multipart: parsedEnv.MULTIPART as boolean,
          },
        cors: {
            origin: parsedEnv.ORIGIN as string,
            exposeHeaders: parsedEnv.EXPOSE_HEADERS as []
        }
    },
    auth: {
        secret: parsedEnv.AUTH_SECRET as string,
        saltRounds: parsedEnv.AUTH_SALT_ROUNDS as string,
        privateKeyFile: parsedEnv.PRIVATE_KEY_FILE as any,
        publicKeyFile: parsedEnv.PUBLIC_KEY_FILE as any,
        privteKeyPassPhrase: parsedEnv.PRIVATE_KEY_PASSPHRASE as string,
        createOptions: {
            expiresIn: parsedEnv.AUTH_EXPIRES_IN as any,
            algorithm: parsedEnv.AUTH_ALGORITHM as any,
            issuer: parsedEnv.AUTH_ISSUER as string,
        }
    },
    database: {
        connection: parsedEnv.CONNECTION as any,
    }
    
}

export default config
