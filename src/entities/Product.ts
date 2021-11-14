import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './Category'

@ObjectType()
@Entity()
export class Product extends BaseEntity {
   @Field()
   @PrimaryGeneratedColumn()
   id!: number

   @Field()
   @Column()
   name!: string

   @Field(() => String)
   @Column()
   description!: string

   @Field()
   @Column({ type: 'float' })
   unitPrice!: number

   @Field()
   @Column({ type: 'float' })
   unitWeight!: number

   @ManyToMany(() => Category, (category) => category.products)
   @JoinTable()
   categories: Category[]
}
