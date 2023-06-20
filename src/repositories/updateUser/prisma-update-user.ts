import { User } from '../../models/user'
import prisma from '../../lib/prisma'
import {
  IUpdateUserParams,
  IUpdateUserRepository,
} from '../../controllers/updateUser/protocols'

export class PrismaUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: IUpdateUserParams): Promise<User> {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
      },
    })
    return updateUser
  }
}
