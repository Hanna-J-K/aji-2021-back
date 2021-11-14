import { OrderStatus, ORDER_STATUS } from '../entities/OrderStatus'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Order } from '../entities/Order'
import { getConnection } from 'typeorm'

@Resolver(Order)
export class OrderResolver {
   @Query(() => [Order])
   async orders(): Promise<Order[]> {
      return Order.find()
   }

   @Query(() => [Order], { nullable: true })
   userOrders(
      @Arg('username', () => String) username: string
   ): Promise<Order[] | undefined> {
      return Order.find({ where: { username: username } })
   }

   @Query(() => [Order], { nullable: true })
   ordersByStatus(
      @Arg('status', () => String) status: string
   ): Promise<Order[] | undefined> {
      return Order.find({ where: { status: status } })
   }

   @Query(() => Order, { nullable: true })
   order(@Arg('id', () => String) id: string): Promise<Order | undefined> {
      return Order.findOne({ id })
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
