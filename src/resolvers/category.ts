import { Category } from '../entities/Category'
import { Query, Resolver } from 'type-graphql'

@Resolver(Category)
export class CategoryResolver {
   @Query(() => [Category])
   async category(): Promise<Category[]> {
      return Category.find()
   }
}
