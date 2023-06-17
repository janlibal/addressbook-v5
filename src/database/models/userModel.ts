import Base from './base'

class User extends Base{
    static get tableName() {
        return 'users'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'password'],
            
            properties: {
                /*id: { 
                    type: 'uuid' 
                },*/
                email: { 
                    type: 'string', 
                },
                name: { 
                    type: 'string',  
                },
                password: { 
                    type: 'string', 
                },
            },
        }
    }

    $formatJson(json:any) {
        json = super.$formatJson(json)
        delete json.password
        delete json.name
        return json
      }
}

export default User