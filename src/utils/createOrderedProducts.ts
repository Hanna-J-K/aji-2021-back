import { OrderedProduct } from "../entities/OrderedProduct"
import { OrderedProductInput } from '../resolvers/order'


const createOrderedProducts = async (products: OrderedProductInput[], orderId: string): Promise<OrderedProduct[]> => {
   const orderedProducts: OrderedProduct[] = []
   for (let key in products) {
      let product: OrderedProduct = await OrderedProduct.create({
         quantity: products[key].quantity,
         product_id: products[key].product_id,
         order: orderId,
      }).save()
      orderedProducts.push(product)
   }
   return orderedProducts
}

export default createOrderedProducts
