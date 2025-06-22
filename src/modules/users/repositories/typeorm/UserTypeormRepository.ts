/* eslint-disable @typescript-eslint/no-explicit-any */
import { Brackets, getConnection, getRepository, Repository } from 'typeorm';
import { IUserRepository } from '../IUserRepository';
import {
  User,
} from '../../../../entities/User';
import { ICreateUserDTO } from '../../dtos/ICreateDTO';
import { IListAllUsersDTO } from '../../dtos/IListAllDTO';

export class UserTypeormRepository implements IUserRepository {
  private userRepository: Repository<User> = getRepository(User);

  public async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  public async updateResetCode(
    id: string,
    data: { resetCode: string; resetCodeExpiration: string }
  ): Promise<void> {
    await this.userRepository.update(id, data);
  }

  public async updatePassword(id: string, password: string): Promise<void> {
    await this.userRepository.update(id, {
      password,
      resetCode: null as any,
      resetCodeExpiration: null as any,
      resetToken: null as any
    });
  }

  public async findByIdComplete(
    id: string,
  ): Promise<User | undefined> {
    const qb = this.userRepository.createQueryBuilder('user');

    qb.leftJoinAndSelect('user.regions', 'regions');
    qb.leftJoinAndSelect('user.memberEntities', 'memberEntities');

    qb.where('user.id = :id', { id });

    qb.select([
      'user',
      'regions.id',
      'regions.name',
      'memberEntities.id',
      'memberEntities.name'
    ]);

    return qb.getOne();
  }

  public async findByEmail(
    email: string,
    allowedPassword = false
  ): Promise<User | undefined> {
    const qb = this.userRepository.createQueryBuilder('user');

    qb.where('user.email = :email', { email });

    if (allowedPassword) {
      qb.addSelect('user.password');
      qb.addSelect('user.resetCode');
      qb.addSelect('user.resetCodeExpiration');
      qb.addSelect('user.resetToken');
    }

    return qb.getOne();
  }

  public async listAll(
    { search, status, page, limit }: IListAllUsersDTO,
  ): Promise<[User[], number]> {
    const qb = this.userRepository.createQueryBuilder('users');

    if (search) {
      qb.where(
        new Brackets((qb) => {
          qb.where('users.name LIKE :search', { search: `%${search}%` });
          qb.orWhere('users.id LIKE :searchFormatted', {
            searchFormatted: `%${search}%`
          });
        })
      );
    }

    if (status) {
      qb.andWhere('users.status = :status', { status });
    }


    qb.orderBy('users.id', 'DESC');

    if (page && limit) {
      qb.skip((page - 1) * limit);
      qb.take(limit);
    }

    return qb.getManyAndCount();
  }

  public async create(data: ICreateUserDTO): Promise<{ id: number }> {
    const newTransaction = await this.startTransaction();
    try {
      const { ...restData } = data;

      const user = this.userRepository.create(restData);
      await this.userRepository.save(user);

      await newTransaction.commitTransaction();
      await newTransaction.release();

      return { id: user.id };
    } catch (error) {
      await newTransaction.rollbackTransaction();
      await newTransaction.release();
      throw error;
    }
  }

  public async update(id: string, data: ICreateUserDTO): Promise<void> {
    const newTransaction = await this.startTransaction();
    try {
      const { ...restData } = data;

      await this.userRepository.update(id, restData);


      await newTransaction.commitTransaction();
      await newTransaction.release();
    } catch (error) {
      await newTransaction.rollbackTransaction();
      await newTransaction.release();
      throw error;
    }
  }


  private async startTransaction() {
    const connection = getConnection();

    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    this.userRepository = queryRunner.manager.getRepository(User);

    return queryRunner;
  }
}

