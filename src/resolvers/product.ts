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
import { getConnection, getRepository, ILike, MoreThan } from 'typeorm'
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

@ObjectType()
class PaginatedProducts {
   @Field(() => [Product])
   products: Product[]
   @Field()
   hasMore: boolean
}

@Resolver(Product)
export class ProductResolver {
   @Query(() => PaginatedProducts)
   async products(
      @Arg('limit', () => Int) limit: number,
      @Arg('cursor', () => Int, { nullable: true }) cursor: number | null,
      @Arg('phrase', () => String, { nullable: true }) phrase: string | null
   ): Promise<PaginatedProducts> {
      if (phrase === null) {
         phrase = ''
      }
      if (cursor === null) {
         cursor = 0
      }
      const realLimit = Math.min(30, limit)
      const products = await getRepository(Product).find({
         relations: ['categories'],
         where: {
            id: MoreThan(cursor),
            name: ILike(`%${phrase}%`),
         },
         order: {
            id: 'ASC',
         },
         take: limit + 1,
      })
      return {
         products: products.slice(0, realLimit),
         hasMore: products.length === realLimit + 1,
      }
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
         const productId = (await Product.create({ ...input }).save()).id
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
