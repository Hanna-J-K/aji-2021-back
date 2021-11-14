import { Field, ObjectType } from 'type-graphql'
import {
   BaseEntity,
   Column,
   CreateDateColumn,
   Entity,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderedProduct } from './OrderedProduct'
import { OrderStatus } from './OrderStatus'

@ObjectType()
@Entity()
export class Order extends BaseEntity {
   @Field()
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @Field(() => String, { nullable: true })
   @CreateDateColumn()
   orderConfirmedDate: Date

   @Field()
   @Column()
   username!: string

   @Field()
   @Column()
   email!: string

   @Field()
   @Column()
   phone!: string

   @Field(() => String)
   @ManyToOne(() => OrderStatus, (status) => status.orderStatus)
   status: OrderStatus

   @OneToMany(() => OrderedProduct, (orderedProducts) => orderedProducts.order)
   orderedProducts: OrderedProduct[]
}
