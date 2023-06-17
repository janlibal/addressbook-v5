import Objection from "objection"
import pg, {Client, Pool} from 'pg'
import knexEnvConfig from './knexfile'


pg.types.setTypeParser(20, 'text', parseInt)
pg.types.setTypeParser(1700, 'text', parseFloat)

import knexLib from 'knex'



const knexConfig = knexEnvConfig.db // select environment ---R.mergeDeepWith({}, knexEnvConfig, objection.knexSnakeCaseMappers())
const knex = knexLib(knexConfig)


const Model = Objection.Model
Model.knex(knex)
const transaction = Objection.transaction


function connect() {
  return knex.raw('select 1 + 1')  
}

function close() {
    return knex.destroy()
}

export {
    Model, 
    knex, 
    //transaction, 
    connect, 
    close    
}