import { CATEGORIES, Category } from '../entities/Category'

const populateCategory = async() => {
   for (let category of Object.values(CATEGORIES)) {
      try {
         await Category.create({
            name: category,
         }).save()
      } catch (err) {
         console.log('database error:', err)
      }
   }
}

export default populateCategory


