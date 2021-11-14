import { ORDER_STATUS, OrderStatus } from '../entities/OrderStatus'

const populateStatuses = async() => {
   for (let status of Object.values(ORDER_STATUS)) {
      try {
         await OrderStatus.create({
            orderStatus: status,
         }).save()
      } catch (err) {
         console.log('database error:', err)
      }
   }
}

export default populateStatuses


