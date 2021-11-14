import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ORDER_STATUS {
   NOT_CONFIRMED = 'not confirmed',
   CONFIRMED = 'confirmed',
   CANCELLED = 'cancelled',
   COMPLETED = 'completed',
}

@Entity()
export class OrderStatus {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({
      type: "enum",
      enum: ORDER_STATUS,
      default: ORDER_STATUS.NOT_CONFIRMED
   })
   orderStatus: ORDER_STATUS
}