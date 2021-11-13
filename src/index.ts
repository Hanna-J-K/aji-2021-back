import path from 'path'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'

const main = async () => {
   // const connection = await createConnection({
   //    type: 'postgres',
   //    database: 'aji-db',
   //    username: 'postgres',
   //    password: 'postgres',
   //    logging: true,
   //    synchronize: true,
   //    migrations: [path.join(__dirname, './migrations/*')],
   //    entities: [],
   // })

   // await connection.runMigrations()

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
         resolvers: [HelloResolver],
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
