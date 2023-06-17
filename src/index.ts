import config from './config'
import log from './utils/logger'
import { close, connect } from './database'
import createServerAndListen from './utils/server'
import app from './utils/app'
import createServer from './utils/server'



export async function server(){
  
  let server: any
  let db: any
  const port = config.server.port

  try {

    db = connect()
    log.debug("Database connected. ")
       
    
    //server = app.listen(config.server.port)
    server = createServer
    log.debug(`Server is listening on ${port}. `)
    
  } catch (err) {

    process.exitCode = 1
    log.fatal('FATAL ERROR WHILE STARTING SERVER!')

  } finally {
    if (!server){
      log.debug("Closing server...")
      server.close()
      log.debug("Server closed")
    }

    if (!db){
    log.debug("Closing database...")
    await close()
    log.debug("Database closed")
    }

  }

}

server()



