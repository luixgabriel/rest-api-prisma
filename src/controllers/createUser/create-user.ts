import { User } from '../../models/user'
import { HttpRequest, HttpResponse } from '../protocols'
import {
  ICreateUserController,
  ICreateUserParams,
  ICreateUserRepository,
} from './protocol'

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {
    createUserRepository = this.createUserRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: 'Please spceify a body',
        }
      }
      const user = await this.createUserRepository.createUser(httpRequest.body)
      return {
        statusCode: 201,
        body: user,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong.',
      }
    }
  }
}
