import { Router, Request, Response } from 'express'
import { GetUsersController } from '../controllers/getUsers/get-users'
import { PrismaGetUsersRepository } from '../repositories/getUsers/prisma-get-users'
import { PrismaCreateUserRepository } from '../repositories/createUser/prisma-create-user'
import { CreateUserController } from '../controllers/createUser/create-user'
import { PrismaUpdateUserRepository } from '../repositories/updateUser/prisma-update-user'
import { UpdateUserController } from '../controllers/updateUser/update-user'
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

routes.put('/users/:id', async (req: Request, res: Response) => {
  const prismaUpdateUserRepository = new PrismaUpdateUserRepository()
  const updateUserController = new UpdateUserController(
    prismaUpdateUserRepository,
  )

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  })

  res.status(statusCode).send(body)
})

export default routes
