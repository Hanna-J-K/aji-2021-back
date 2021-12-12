import { Admin } from "../entities/Admin"
import argon2 from 'argon2'


const createAdmin = async (username: string, password: string) => {
   const hashedPassword = await argon2.hash(password)
   await Admin.create({
      username: username,
      password: hashedPassword
   }).save()
}

export default createAdmin
