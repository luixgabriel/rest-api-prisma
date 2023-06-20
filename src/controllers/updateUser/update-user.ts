import { User } from '../../models/user'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { IUpdateUserParams, IUpdateUserRepository } from './protocols'
import { badRequest, created, serverError } from '../helpers'

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {
    updateUserRepository = this.updateUserRepository
  }

  async handle(
    httpRequest: HttpRequest<IUpdateUserParams>,
  ): Promise<HttpResponse<User | string>> {
    const id = httpRequest.params.id
    let body = httpRequest.body
    if (!id) {
      return badRequest('Missing user ID.')
    }
    const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
      'firstName',
      'lastName',
      'password',
    ]
    const someFiledsNotAllowedToUpdate = Object.keys(body || '').some(
      (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams),
    )

    if (someFiledsNotAllowedToUpdate) {
      return badRequest('Some received field is not allowed.')
    }

    const bodySchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      password: z.string(),
    })

    try {
      bodySchema.parse(body)
      if (body?.password) {
        const hashedPassword = await bcrypt.hash(body?.password, 10)
        body = { ...body, password: hashedPassword }
      }
      const updateUser = await this.updateUserRepository.updateUser(id, body)
      return created<User>(updateUser)
    } catch (error) {
      return serverError()
    }
  }
}
