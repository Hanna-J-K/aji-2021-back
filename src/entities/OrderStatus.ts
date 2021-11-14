import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './Order'

export enum ORDER_STATUS {
   NOT_CONFIRMED = 'not confirmed',
   CONFIRMED = 'confirmed',
   CANCELLED = 'cancelled',
   COMPLETED = 'completed',
}
@ObjectType()
@Entity()
export class OrderStatus extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number

   @Field(() => String)
   @Column({
      unique: true,
      type: 'enum',
      enum: ORDER_STATUS,
      default: ORDER_STATUS.NOT_CONFIRMED,
   })
   orderStatus: string
}
