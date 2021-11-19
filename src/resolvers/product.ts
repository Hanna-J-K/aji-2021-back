import { Product } from '../entities/Product'
import {
   Arg,
   Field,
   InputType,
   Int,
   Mutation,
   ObjectType,
   Query,
   Resolver,
} from 'type-graphql'
import { Category } from '../entities/Category'
import { getConnection } from 'typeorm'
import { IsPositive, Length, validate } from 'class-validator'
import { FieldError } from './order'
import validationResponseMap from '../utils/validationResponseMap'

@InputType()
class ProductInput {
   @Length(1, 255)
   @Field({ nullable: true })
   name?: string

   @Length(1, 255)
   @Field({ nullable: true })
   description?: string

   @IsPositive()
   @Field({ nullable: true })
   unitPrice?: number

   @IsPositive()
   @Field({ nullable: true })
   unitWeight?: number

   @Field(() => String, { nullable: true })
   categories?: Category[]
}

@ObjectType()
class ProductResponse {
   @Field(() => [FieldError], { nullable: true })
   errors?: FieldError[]
   @Field(() => Product, { nullable: true })
   product?: Product
}

@Resolver(Product)
export class ProductResolver {
   @Query(() => [Product])
   async products(): Promise<Product[]> {
      const products = await Product.find({ relations: ['categories'] })
      return products
   }

   @Query(() => Product, { nullable: true })
   product(@Arg('id', () => Int) id: number): Promise<Product | undefined> {
      return Product.findOne(id, { relations: ['categories'] })
   }

   @Mutation(() => ProductResponse)
   async createProduct(
      @Arg('input') input: ProductInput
   ): Promise<ProductResponse> {
      const errors = await validate(input)
      if (errors.length === 0) {
         const productId = await (await Product.create({ ...input }).save()).id
         const product = await Product.findOne(productId, {
            relations: ['categories'],
         })
         return { product: product }
      }
      return { errors: validationResponseMap(errors) }
   }

   @Mutation(() => ProductResponse)
   async updateProduct(
      @Arg('id', () => Int) id: number,
      @Arg('input') input: ProductInput
   ): Promise<ProductResponse> {
      const product = await Product.findOne(id)
      const errorArray: FieldError[] = []
      if (!product) {
         errorArray.push({
            field: 'id',
            message: ['product with provided id doesnt exists'],
         })
         return { errors: errorArray }
      } else {
         const errors = await validate(input)
         if (errors.length === 0) {
            const result = await getConnection()
               .createQueryBuilder()
               .update(Product)
               .set({ ...input })
               .where('id = :id', {
                  id,
               })
               .returning('*')
               .execute()
            return { product: result.raw[0] }
         }
         return { errors: validationResponseMap(errors) }
      }
   }
}
