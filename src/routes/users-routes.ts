import { Router, Request, Response } from 'express'
import { GetUsersController } from '../controllers/getUsers/get-users'
import { PrismaGetUsersRepository } from '../repositories/getUsers/prisma-get-users'
import { PrismaCreateUserRepository } from '../repositories/createUser/prisma-create-user'
import { CreateUserController } from '../controllers/createUser/create-user'
const routes = Router()

routes.get('/', async (req: Request, res: Response) => {
  const prismaGetUsersRepository = new PrismaGetUsersRepository()
  const getUsersController = new GetUsersController(prismaGetUsersRepository)
  const { body, statusCode } = await getUsersController.handle()
  res.status(statusCode).send(body)
})

routes.post('/users', async (req: Request, res: Response) => {
  const prismaCreateUserRepository = new PrismaCreateUserRepository()
  const createUserController = new CreateUserController(
    prismaCreateUserRepository,
  )

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  })

  res.status(statusCode).send(body)
})

export default routes
