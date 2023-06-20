import { IDeleteUserRepository } from '../../controllers/deleteUser/protocols'
import prisma from '../../lib/prisma'
import { User } from '../../models/user'

export class PrismaDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      throw new Error('User not found.')
    }
    await prisma.user.delete({
      where: {
        id: user?.id,
      },
    })

    return user
  }
}
