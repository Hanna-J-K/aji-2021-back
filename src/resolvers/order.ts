import { OrderStatus } from '../entities/OrderStatus'
import {
   Arg,
   Field,
   InputType,
   Mutation,
   ObjectType,
   Query,
   Resolver,
} from 'type-graphql'
import { IsEmail, Length, validate } from 'class-validator'
import { Order } from '../entities/Order'
import { getConnection } from 'typeorm'
import orderResponseMap from '../utils/orderResponseMap'

@InputType()
class OrderInput {
   @Field()
   @Length(1, 255)
   username: string
   @Field()
   @IsEmail()
   @Length(1, 255)
   email: string
   @Field()
   @Length(9, 10)
   phone: string
}

@ObjectType()
export class FieldError {
   @Field()
   field: string
   @Field(() => [String])
   message: (string | undefined)[]
}

@ObjectType()
class OrderResponse {
   @Field(() => [FieldError], { nullable: true })
   errors?: FieldError[]
   @Field(() => Order, { nullable: true })
   order?: Order
}

@Resolver(Order)
export class OrderResolver {
   @Mutation(() => OrderResponse)
   async createOrder(@Arg('input') input: OrderInput): Promise<OrderResponse> {
      const errors = await validate(input)
      if (errors.length === 0) {
         const status = await OrderStatus.findOne({
            where: { orderStatus: 'not confirmed' },
         })
         const order = await Order.create({ ...input, status: status }).save()
         return { errors: undefined, order: order }
      }
      return { errors: orderResponseMap(errors) }
   }

   @Query(() => [Order])
   async orders(): Promise<Order[]> {
      // WAZNE, ZEBY DODAC TE RELACJE!
      const orders = await Order.find({ relations: ['status'] })
      return orders
   }

   @Query(() => [Order], { nullable: true })
   userOrders(
      @Arg('username', () => String) username: string
   ): Promise<Order[] | undefined> {
      return Order.find({
         where: { username: username },
         relations: ['status'],
      })
   }

   @Query(() => [Order], { nullable: true })
   ordersByStatus(
      @Arg('status', () => String) status: string
   ): Promise<Order[] | undefined> {
      return Order.find({ where: { status: status }, relations: ['status'] })
   }

   @Query(() => Order, { nullable: true })
   order(@Arg('id', () => String) id: string): Promise<Order | undefined> {
      return Order.findOne({ where: { id }, relations: ['status'] })
   }

   @Query(() => [OrderStatus])
   async orderStatuses(): Promise<OrderStatus[]> {
      return OrderStatus.find()
   }

   @Mutation(() => Order)
   async updateOrder(
      @Arg('id', () => String) id: string,
      @Arg('status', () => String) status: OrderStatus
   ): Promise<Order | null> {
      const order = await Order.findOne(id)
      const currentStatus = order?.status.orderStatus
      if (currentStatus === ('canceled' || 'completed')) {
         return null
      } else if (
         currentStatus === 'confirmed' &&
         status.orderStatus === 'not confirmed'
      ) {
         return null
      } else if (
         currentStatus === 'not confirmed' &&
         status.orderStatus !== 'confirmed'
      ) {
         return null
      } else {
         const result = await getConnection()
            .createQueryBuilder()
            .update(Order)
            .set({ status: status })
            .where('id = :id', {
               id,
            })
            .returning('*')
            .execute()
         return result.raw[0]
      }
   }
}
