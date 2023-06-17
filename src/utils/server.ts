import config from '../config'
import app from './app'

const port = config.server.port || 8080

const createServer = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
})

export default createServer