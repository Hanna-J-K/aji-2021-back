import path from 'path'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { CATEGORIES, Category } from './entities/Category'
import { Order } from './entities/Order'
import { OrderedProduct } from './entities/OrderedProduct'
import { OrderStatus, ORDER_STATUS } from './entities/OrderStatus'
import { Product } from './entities/Product'
import { ProductResolver } from './resolvers/product'
import { CategoryResolver } from './resolvers/category'
import populateCategory from './utils/populateCategories'
import { OrderResolver } from './resolvers/order'
import populateStatuses from './utils/populateStatuses'
import session from 'express-session'
import { Admin } from './entities/Admin'
import createAdmin from './utils/createAdmin'
import { AdminResolver } from './resolvers/admin'

const main = async () => {
   const connection = await createConnection({
      type: 'postgres',
      database: 'aji-db',
      username: 'postgres',
      password: 'postgres',
      logging: true,
      //synchronize: true,
      migrations: [path.join(__dirname, './migrations/*')],
      entities: [Category, Order, OrderedProduct, OrderStatus, Product, Admin],
      //dropSchema: true
   })

   let categoriesCount = await connection.getRepository(Category).count()
   let orderStatusCount = await connection.getRepository(OrderStatus).count()
   let isAdmin = await connection.getRepository(Admin).count()
   if (!isAdmin) {
      createAdmin('admin', 'chania')
   }
   if (categoriesCount !== Object.keys(CATEGORIES).length) {
      populateCategory()
   }
   if (orderStatusCount !== Object.keys(ORDER_STATUS).length) {
      populateStatuses()
   }

   await connection.runMigrations()
   const app = express()

   app.use(
      cors({
         origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
         credentials: true,
      })
   )

   app.use(
      session({
         name: 'qid',
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true,
            sameSite: 'lax', // csrf
         },
         saveUninitialized: false,
         secret: 'supersecretsecret',
         resave: false,
      })
   )

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [ProductResolver, CategoryResolver, OrderResolver, AdminResolver],
         validate: false,
      }),
      context: ({ req, res }: any) => ({
         req,
         res,
      }),
   })
   await apolloServer.start()

   apolloServer.applyMiddleware({
      app,
      cors: false,
   })

   app.listen(4000, () => {
      console.log('server started on localhost:4000')
   })
}

main()
