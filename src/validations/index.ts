import jsonschema from 'jsonschema'
import * as errors from '../utils/errors'
import logger from '../utils/logger'


function validate(schema:any, inputData:any) {
  const validator = new jsonschema.Validator()
  schema.additionalProperties = false
  const validationErrors = validator.validate(inputData, schema).errors
  if (validationErrors.length > 0) {
    logger.info(validationErrors)
    throw new errors.RequestValidationErrors('Validation error')
  }
}

export default validate