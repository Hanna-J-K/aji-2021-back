import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@ObjectType()
@Entity()
export class Admin extends BaseEntity {

   @Field()
   @PrimaryGeneratedColumn('uuid')
   id!: string

   @Field()
   @Column()
   username!: string

   @Column()
   password: string
}
