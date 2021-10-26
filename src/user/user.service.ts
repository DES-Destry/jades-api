import { Injectable } from '@nestjs/common';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  public async getByUsername(username: string): Promise<IUser> {
    const user = await this._userRepository.getByUsername(username);
    return user;
  }

  public async getByLogin(login: string): Promise<IUser> {
    const user = await this._userRepository.getByLogin(login);
    return user;
  }

  public async createUser(dto: CreateUserDto): Promise<IUser> {
    const user = await this._userRepository.create(dto);
    return user;
  }
}
