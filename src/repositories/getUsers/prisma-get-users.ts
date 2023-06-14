import { IGetUsersRepository } from '../../controllers/getUsers/protocols'
import { User } from '../../models/user'
import prisma from '../../lib/prisma'

export class PrismaGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const user = await prisma.user.findMany()
    return user
  }
}
