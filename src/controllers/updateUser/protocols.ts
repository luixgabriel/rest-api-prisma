import { User } from '../../models/user'
import { HttpRequest, HttpResponse } from '../protocols'

export interface IUpdateUserParams {
  firstName?: string
  lastName?: string
  email?: string
}
export interface IUpdateUserController {
  handle(
    httpRequest: HttpRequest<IUpdateUserParams>,
  ): Promise<HttpResponse<User>>
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<User>
}
