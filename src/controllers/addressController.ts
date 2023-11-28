import schema from '../validations/schemas/addressSchema'
import { IContext } from '../interfaces/IContext'
import validate from '../validations'
import addressOperations from '../operations/addressOperations'
import { IContact } from '../interfaces/IContact'


export async function address(ctx: IContext){


    const userId = ctx.state.userId
    
    const body = {
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        phoneNo: ctx.request.body.phoneNo,
        address: ctx.request.body.address,
    }

    validate(schema.address, body)

    const input: IContact = {
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNo: body.phoneNo,
        address: body.address,
        userId: userId
    }

    const address = await addressOperations.create(input)

    ctx.body = {
        status: 'success',
        data: address
    }

}


