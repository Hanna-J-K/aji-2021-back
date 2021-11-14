import { Field, ObjectType } from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
   id!: number;

   @Field()
   @Column({
      unique: true,
      type: "enum",
      enum: ORDER_STATUS,
      default: ORDER_STATUS.NOT_CONFIRMED
   })
   orderStatus: string
}