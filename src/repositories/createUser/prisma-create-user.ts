import { User } from '../../models/user'
import prisma from '../../lib/prisma'
import {
  ICreateUserRepository,
  ICreateUserParams,
} from '../../controllers/createUser/protocol'

export class PrismaCreateUserRepository implements ICreateUserRepository {
  async createUser(params: ICreateUserParams): Promise<User> {
    const user = await prisma.user.create({
      data: params,
    })
    const userBD = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    })
    return userBD
  }
}
