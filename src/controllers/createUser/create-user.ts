import { User } from '../../models/user'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { ICreateUserParams, ICreateUserRepository } from './protocol'
import { badRequest, created, serverError } from '../helpers'

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {
    createUserRepository = this.createUserRepository
  }

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    const bodySchema = z.object({
      firstName: z.string().nonempty(),
      lastName: z.string().nonempty(),
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    })

    try {
      let bodyRequest = bodySchema.parse(httpRequest.body)
      if (!bodyRequest) {
        return badRequest('Please specify a body')
      }
      const hashedPassword = await bcrypt.hash(bodyRequest.password, 10)

      bodyRequest = { ...bodyRequest, password: hashedPassword }

      const user = await this.createUserRepository.createUser(bodyRequest)
      return created<User>(user)
    } catch (error) {
      return serverError()
    }
  }
}
