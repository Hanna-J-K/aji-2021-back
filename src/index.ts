import path from 'path'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { Category } from './entities/Category'
import { Order } from './entities/Order'
import { OrderedProduct } from './entities/OrderedProduct'
import { OrderStatus } from './entities/OrderStatus'
import { Product } from './entities/Product'
import { ProductResolver } from './resolvers/product'
import { CategoryResolver } from './resolvers/category'
import populateCategory from './utils/populateCategories'
import { OrderResolver } from './resolvers/order'
import populateStatuses from './utils/populateStatuses'

const main = async () => {
   const connection = await createConnection({
      type: 'postgres',
      database: 'aji-db',
      username: 'postgres',
      password: 'postgres',
      logging: true,
      synchronize: true,
      migrations: [path.join(__dirname, './migrations/*')],
      entities: [Category, Order, OrderedProduct, OrderStatus, Product],
      dropSchema: true
   })

   populateCategory()
   populateStatuses()

   Product.create({name: 'chania', description: 'jeszcze lepiej', unitPrice: 15, unitWeight: 10}).save()

   await connection.runMigrations()

   const app = express()

   // app.set('trust proxy', 1)
   // app.use(
   //    cors({
   //       origin: 'http://localhost:3000',
   //       credentials: true,
   //    })
   // )

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [ProductResolver, CategoryResolver, OrderResolver],
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
      // cors: false,
   })

   app.listen(4000, () => {
      console.log('server started on localhost:4000')
   })

}

main()
