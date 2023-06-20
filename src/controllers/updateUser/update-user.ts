import { User } from '../../models/user'
import { HttpRequest, HttpResponse } from '../protocols'
import { z } from 'zod'
import {
  IUpdateUserController,
  IUpdateUserParams,
  IUpdateUserRepository,
} from './protocols'

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {
    updateUserRepository = this.updateUserRepository
  }

  async handle(
    httpRequest: HttpRequest<IUpdateUserParams>,
  ): Promise<HttpResponse<User>> {
    const id = httpRequest.params.id
    const body = httpRequest.body
    if (!id) {
      return {
        statusCode: 400,
        body: 'Missing user ID.',
      }
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
      return {
        statusCode: 400,
        body: 'Some received field is not allowed.',
      }
    }

    const bodySchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      password: z.string(),
    })

    try {
      bodySchema.parse(body)
      const updateUser = await this.updateUserRepository.updateUser(id, body)
      return {
        statusCode: 400,
        body: updateUser,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong.',
      }
    }
  }
}
