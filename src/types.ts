import { Session, SessionData } from 'express-session'
import { Request, Response } from 'express'

export type MyContext = {
   req: Request & {
      session: Session & Partial<SessionData> & { adminId: string }
   }
   res: Response
}
