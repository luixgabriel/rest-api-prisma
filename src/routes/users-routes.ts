import { Router, Request, Response } from 'express'
import { GetUsersController } from '../controllers/getUsers/get-users'
import { PrismaGetUsersRepository } from '../repositories/getUsers/prisma-get-users'
const routes = Router()

const prismaGetUsersRepository = new PrismaGetUsersRepository()
const getUsersController = new GetUsersController(prismaGetUsersRepository)

routes.get('/', async (req: Request, res: Response) => {
  const { body, statusCode } = await getUsersController.handle()
  res.send(body).status(statusCode)
})

export default routes
