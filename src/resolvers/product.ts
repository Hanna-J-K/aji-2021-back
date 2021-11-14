import { Product } from '../entities/Product'
import {
   Arg,
   Field,
   InputType,
   Int,
   Mutation,
   Query,
   Resolver,
} from 'type-graphql'
import { Category } from 'src/entities/Category'
import { getConnection } from 'typeorm'

@InputType()
class ProductInput {
   @Field({ nullable: true })
   name?: string
   @Field({ nullable: true })
   description?: string
   @Field({ nullable: true })
   unitPrice?: number
   @Field({ nullable: true })
   unitWeight?: number
   @Field(() => String, { nullable: true })
   categories?: Category[]
}

@Resolver(Product)
export class ProductResolver {
   @Query(() => [Product])
   async products(): Promise<Product[]> {
      return Product.find()
   }

   @Query(() => Product, { nullable: true })
   product(@Arg('id', () => Int) id: number): Promise<Product | undefined> {
      return Product.findOne(id)
   }

   @Mutation(() => Product)
   async createProduct(@Arg('input') input: ProductInput): Promise<Product> {
      return Product.create({ ...input }).save()
   }

   @Mutation(() => Product)
   async updateProduct(
      @Arg('id', () => Int) id: number,
      @Arg('input') input: ProductInput
   ): Promise<Product | null> {
      const result = await getConnection()
         .createQueryBuilder()
         .update(Product)
         .set({ ...input })
         .where('id = :id', {
            id,
         })
         .returning('*')
         .execute()
      return result.raw[0]
   }
}
