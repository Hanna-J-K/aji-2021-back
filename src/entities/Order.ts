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

   @Field(() => String)
   @CreateDateColumn()
   orderPlaceDate: Date

   @Field(() => String, { nullable: true })
   @Column({ nullable: true })
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

   @Field(() => OrderStatus)
   @ManyToOne(() => OrderStatus)
   status: OrderStatus

   @Field(() => [OrderedProduct])
   @OneToMany(() => OrderedProduct, (orderedProducts) => orderedProducts.order)
   orderedProducts: OrderedProduct[]
}
