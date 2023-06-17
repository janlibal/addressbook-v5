import { IContext } from "../interfaces/IContext"
import userOperations from "../operations/userOperations"
import validate from "../validations"
import schema from '../validations/schemas/userSchema'


export async function signUp(ctx: IContext){

    const input = {
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: ctx.request.body.password
    }

    validate(schema.signUp, input)

    const user = await userOperations.create(input)


    ctx.body = {
        status: 'success',
        data: user
    }

}


export async function signIn(ctx: IContext){

    const input = {
        email: ctx.request.body.email,
        password: ctx.request.body.password
    }

    validate(schema.signIn, input)

    const user = await userOperations.login(input)


    ctx.body = {
        status: 'success',
        data: user
    }

}