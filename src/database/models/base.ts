import { Model } from '../index'
import _ from 'lodash'

let updatedAt: any
let createdAt: any

class Base extends Model {
    $beforeInsert() {
      updatedAt = createdAt = createdAt || new Date()
    }
}




export default Base