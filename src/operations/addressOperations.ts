import { IContact, IContactData, IUserData } from "../interfaces/IContact"
import repository from "../repositories/addressRepository"
import logger from "../utils/logger"

async function create(input: IContact) {
    
    logger.info('create address started')

    const fullName = input.lastName + ', ' + input.firstName
     

    const contactData: IContactData = {
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNo: input.phoneNo,
        address: input.address,
    }

    const userData: IUserData = {
        fullName: fullName,
        userId: input.userId.toString(),
    }

    const contact = await repository.save(contactData, userData)

    logger.info('create address finished')
    
    return contact

}

export default {
     create
}