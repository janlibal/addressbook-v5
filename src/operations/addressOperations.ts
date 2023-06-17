import repository from "../repositories/addressRepository"
import logger from "../utils/logger"

async function create(input: any) {
    
    logger.info('create address started')

    const fullName = input.lastName + ', ' + input.firstName

    const contactData = {
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNo: input.phoneNo,
        address: input.address,
    }

    const userData = {
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