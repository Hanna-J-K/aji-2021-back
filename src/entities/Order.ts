import { Field, ObjectType } from 'type-graphql'
import {
   BaseEntity,
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
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
   @Column({unique: true})
   email!: string

   @Field()
   @Column()
   phone!: string

   @Field(() => OrderStatus)
   @ManyToOne(() => OrderStatus)
   status: OrderStatus

   @OneToMany(() => OrderedProduct, (orderedProducts) => orderedProducts.order)
   orderedProducts: OrderedProduct[]
}
