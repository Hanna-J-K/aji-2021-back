import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'

@Entity()
export class OrderedProduct extends BaseEntity {
   @Column({ type: 'int' })
   quantity: number

   @PrimaryColumn()
   product_id: number

   @PrimaryColumn()
   order_id: string

   @ManyToOne(() => Product)
   product: Product

   @ManyToOne(() => Order, (order) => order.orderedProducts)
   order: Order
}
