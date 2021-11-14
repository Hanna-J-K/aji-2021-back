import { Product } from "../entities/Product";
import { Query, Resolver } from "type-graphql";

@Resolver(Product)
export class ProductResolver {
   @Query(() => [Product])
   async products(): Promise<Product[]> {
      return Product.find()
   }
}