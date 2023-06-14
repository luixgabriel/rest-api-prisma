import { IGetUsersRepository } from '../../controllers/getUsers/protocols'
import { User } from '../../models/user'

export class PrismaGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: 'luis',
        lastName: 'gabriel',
        email: 'luisgasbriel@gmail.com',
        password: '94443572',
      },
    ]
  }
}
