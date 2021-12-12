import { MyContext } from '../types'
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { Admin } from '../entities/Admin'
import argon2 from 'argon2'


@ObjectType()
class AdminResponse {
   @Field(() => Boolean, { nullable: true })
   error?: Boolean
   @Field(() => Admin, { nullable: true })
   admin?: Admin
}

@Resolver(Admin)
export class AdminResolver {
   @Query(() => Admin, { nullable: true })
   me(@Ctx() { req }: MyContext) {
      if (!req.session.adminId) {
         return null
      }
      return Admin.findOne(req.session.adminId)
   }

   @Mutation(() => AdminResponse)
   async login(
      @Arg('username') username: string,
      @Arg('password') password: string,
      @Ctx() { req }: MyContext
   ): Promise<AdminResponse> {
      const admin = await Admin.findOne({where: { username }})
      if (!admin) {
         return { error: true }
      }
      const valid = await argon2.verify(admin.password, password)
      if (!valid) {
         return { error: true }
      }
      req.session.adminId = admin.id
      return { admin: admin }
   }

   @Mutation(() => Boolean)
   logout(@Ctx() { req, res }: MyContext) {
      return new Promise((resolve) =>
         req.session.destroy((err) => {
            res.clearCookie('qid')
            if (err) {
               console.log(err)
               resolve(false)
               return
            }
            resolve(true)
         })
      )
   }
}
