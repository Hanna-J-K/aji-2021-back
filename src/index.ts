import path from 'path'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { Category } from './entities/Category'
import { Order } from './entities/Order'
import { OrderedProduct } from './entities/OrderedProduct'
import { OrderStatus } from './entities/OrderStatus'
import { Product } from './entities/Product'
import { ProductResolver } from './resolvers/product'

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
   })

   //const category = Category.findOne('ingredients')

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
         resolvers: [HelloResolver, ProductResolver],
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
