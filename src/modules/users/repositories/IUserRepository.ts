import { User } from '../../../entities/User';
import { WhoDoes } from '../../../interfaces/IWhoDoes';
import { ICreateUserDTO } from '../dtos/ICreateDTO';
import { IListAllUsersDTO } from '../dtos/IListAllDTO';

abstract class IUserRepository {
  abstract findById(id: string): Promise<User | undefined>;
  abstract findByIdComplete(
    id: string,
    whoDoes?: WhoDoes
  ): Promise<User | undefined>;
  abstract findByEmail(
    email: string,
    allowedPassword?: boolean
  ): Promise<User | undefined>;
  abstract listAll(
    params: IListAllUsersDTO,
    whoDoes: WhoDoes
  ): Promise<[User[], number]>;
  abstract create(data: ICreateUserDTO): Promise<{ id: number }>;
  abstract update(id: string, data: ICreateUserDTO): Promise<void>;
  abstract updateResetCode(
    id: string,
    data: { resetCode: string; resetCodeExpiration: string; resetToken: string }
  ): Promise<void>;
  abstract updatePassword(id: string, password: string): Promise<void>;
}

export { IUserRepository };
