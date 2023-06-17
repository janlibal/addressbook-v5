import  { User }  from "../database/models"

async function findByEmail(email: string) {
    let user: any
    user = await User.query().where('email', email).first()
    return user
}

async function findById(id: number) {
    let user: any
    user = await User.query().where('id', id).first()
    return user
}

async function saveUser(attributes:any) {
    let user: any
    user = await User.query().insertAndFetch(attributes)
    return user
  }


export default {
    findByEmail,
    findById,
    saveUser
}