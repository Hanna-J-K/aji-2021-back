import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Order } from './Order'

@ObjectType()
@Entity()
export class OrderedProduct extends BaseEntity {
   @Field()
   @Column({ type: 'int' })
   quantity!: number

   @Field()
   @PrimaryColumn()
   product_id!: number

   @ManyToOne(() => Order, (order) => order.id)
   @PrimaryColumn()
   order!: string
}
