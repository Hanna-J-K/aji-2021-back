import { ValidationError } from 'class-validator'
import { FieldError } from '../resolvers/order'

const validationResponseMap = (validationErrors: ValidationError[]) => {
   const arrayOfErrors: FieldError[] = []
   for (let key in validationErrors) {
      let messages: string[] = []
      Object.values(validationErrors[key].constraints as {}).forEach((msg) => {
         messages.push(msg as string)
      })

      arrayOfErrors.push({
         field: validationErrors[key].property,
         message: messages,
      })
   }
   return arrayOfErrors
}

export default validationResponseMap
