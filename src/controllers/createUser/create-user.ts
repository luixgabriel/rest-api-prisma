import { User } from '../../models/user'
import { HttpRequest, HttpResponse } from '../protocols'
import { z } from 'zod'
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
    const bodySchema = z.object({
      firstName: z.string().nonempty(),
      lastName: z.string().nonempty(),
      email: z.string().nonempty(),
      password: z.string().nonempty(),
    })

    try {
      const bodyRequest = bodySchema.parse(httpRequest.body)
      if (!bodyRequest) {
        return {
          statusCode: 400,
          body: 'Please specify a body',
        }
      }
      const user = await this.createUserRepository.createUser(bodyRequest)
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
