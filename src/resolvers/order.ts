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
import {
   ArrayNotEmpty,
   IsEmail,
   IsInt,
   IsMobilePhone,
   IsPositive,
   Length,
   validate,
} from 'class-validator'
import { Order } from '../entities/Order'
import { getConnection } from 'typeorm'
import orderResponseMap from '../utils/validationResponseMap'
import createOrderedProducts from '../utils/createOrderedProducts'

@InputType()
export class OrderedProductInput {
   @Field()
   @IsInt()
   @IsPositive()
   quantity!: number

   @Field()
   @IsInt()
   @IsPositive()
   product_id!: number
}

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
   @IsMobilePhone('en-US')
   phone: string

   @Field(() => [OrderedProductInput], { nullable: true })
   @ArrayNotEmpty()
   orderedProducts?: OrderedProductInput[]
}

@ObjectType()
export class FieldError {
   @Field()
   field: string
   @Field(() => [String])
   message: (string | undefined)[] | string
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
         await createOrderedProducts(
            input.orderedProducts!, order.id
         )
         const orderWithProducts = await Order.findOne(order.id, {
            relations: ['status', 'orderedProducts'],
         })
         console.log(orderWithProducts?.orderedProducts)
         return { errors: undefined, order: orderWithProducts }
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
      return Order.findOne({ where: { id }, relations: ['status', 'orderedProducts'] })
   }

   @Query(() => [OrderStatus])
   async orderStatuses(): Promise<OrderStatus[]> {
      return OrderStatus.find()
   }

   @Mutation(() => OrderResponse)
   async updateOrder(
      @Arg('id', () => String) id: string,
      @Arg('status', () => String) status: OrderStatus
   ): Promise<OrderResponse> {
      const order = await Order.findOne(id, { relations: ['status'] })
      const errorArray: FieldError[] = []
      if (!order) {
         errorArray.push({
            field: 'id',
            message: ['order with provided id doesnt exists'],
         })
         return { errors: errorArray }
      }
      const newStatus = await OrderStatus.findOne(status)
      const currentStatus = order?.status.orderStatus
      if (currentStatus === newStatus?.orderStatus) {
         errorArray.push({
            field: 'orderStatus',
            message: ['cannot change order status to old order status'],
         })
         return { errors: errorArray }
      } else if (
         currentStatus === 'canceled' ||
         currentStatus === 'completed'
      ) {
         errorArray.push({
            field: 'orderStatus',
            message: ['cannot change canceled or completed status'],
         })
         return { errors: errorArray }
      } else if (
         currentStatus === 'confirmed' &&
         newStatus?.orderStatus === 'not confirmed'
      ) {
         errorArray.push({
            field: 'orderStatus',
            message: ['cannot revert confirmed status'],
         })
         return { errors: errorArray }
      } else if (
         currentStatus === 'not confirmed' &&
         newStatus?.orderStatus !== 'confirmed'
      ) {
         errorArray.push({
            field: 'orderStatus',
            message: [
               'cannot change state of not confirmed status to other than confirmed',
            ],
         })
         return { errors: errorArray }
      } else {
         await getConnection()
            .createQueryBuilder()
            .relation(Order, 'status')
            .of(order)
            .set(status)
         if (newStatus?.orderStatus === 'confirmed') {
            const result = await getConnection()
               .createQueryBuilder()
               .update(Order)
               .set({ orderConfirmedDate: Date.now() })
               .where('id = :id', { id })
               .returning('*')
               .execute()
            return { errors: undefined, order: result.raw[0] }
         }
         const updatedOrder = await Order.findOne(id, { relations: ['status'] })
         return { errors: undefined, order: updatedOrder }
      }
   }
}
