export interface IConfig {
    appName: string
    nodeVer: string
        server: {
            port: string,
            environment: string,
            bodyParser: {
                patchKoa: boolean,
                urlencoded: boolean,
                text: boolean,
                json: boolean,
                multipart: boolean,
              },
            cors: {
                origin: string,
                exposeHeaders: []
            }
        }
        database: {
            connection: string
        }
    debugLogging: boolean
    pinoMinLevel: string
    pinoEnabled: boolean
        auth: {
            secret: string
            saltRounds: string
            privateKeyFile: any
            publicKeyFile: any
            privteKeyPassPhrase: string
            createOptions: {
                expiresIn: any
                algorithm: any
                issuer: string
            }
        }
}




