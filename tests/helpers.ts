import userRepository from "../src/repositories/userRepository"
import crypto from "../src/utils/crypto"
import { randLastName, randFirstName, randPhoneNumber, randStreetAddress, randEmail } from '@ngneat/falso'



export async function createDummyAndAuthorize() {
  const pwd = 'Password123!'

  const firstName = randFirstName()
  const lastName = randLastName()
  const name = firstName + ' ' + lastName
  const email = randEmail()
  
  const dummyUser = {
    name: name,
    email: email,
    password: await crypto.hashPassword(pwd),
  }

  let createdUser: any

  createdUser = await userRepository.saveUser(dummyUser)

  createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)

  return createdUser
  
  
}

export async function createDummy() {
    
  const firstName = randFirstName()
  const lastName = randLastName()
  const name = firstName + ' ' + lastName
  const email = randEmail()
  const pwd = 'Password123!'
  
  const dummyUser = {
    name: name,
    email: email,
    password: await crypto.hashPassword(pwd),
  }

  return await userRepository.saveUser(dummyUser)
  
}

