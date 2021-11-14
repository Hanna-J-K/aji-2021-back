import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Entity, ManyToMany, Column, PrimaryColumn } from 'typeorm'
import { Product } from './Product'

export enum CATEGORIES {
   INGREDIENTS = 'ingredients', // eg. bat wings, herbs
   EQUIPMENT = 'equipment', // eg. broomsticks, wands
   CLOTHING = 'clothing', // eg. robes, gloves
   MATERIALS = 'materials', // eg. coal, wool
   COLLECTIBLES = 'collectibles', // eg. cards, coins
   PERISHABLE = 'perishable', // eg. ingredients, food
   NON_PERISHABLE = 'non-perishable', // eg. clothing, materials
}

@ObjectType()
@Entity()
export class Category extends BaseEntity {
   @Field()
   @PrimaryColumn({ unique: true })
   name!: string

   @Column({
      type: 'enum',
      enum: CATEGORIES,
      default: CATEGORIES.INGREDIENTS,
   })
   categories: CATEGORIES

   @ManyToMany(() => Product, (product) => product.categories)
   products: Product[]
}
