const address = {
  type: 'Object',
  required: true,
  properties: {
    firstName: { type: 'string', required: true, maxLength: 80 },
    lastName: { type: 'string', required: true, maxLength: 80 },
    phoneNo: { type: 'string', required: true, maxLength: 20 },
    address: { type: 'string', required: true, maxLength: 80 },
  }
}
      
export default { address }