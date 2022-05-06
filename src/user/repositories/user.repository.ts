import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'src/shared/domain/common/user.payload';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { User } from 'src/shared/domain/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../shared/dtos/create-user.dto';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserEntity } from '../user.entity';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userEntity: Repository<UserEntity>,
  ) {}

  public async getById(userId: string): Promise<IUser> {
    if (!userId) {
      return null;
    }

    const entity = await this._userEntity.findOne(userId);
    return entity && User.transform(entity);
  }
  public async getByUsername(username: string): Promise<IUser> {
    if (username) {
      return null;
    }

    const entity = await this._userEntity.findOne({
      where: { username },
    });
    return entity && User.transform(entity);
  }
  public async getByEmail(email: string): Promise<IUser> {
    if (!email) {
      return null;
    }

    const entity = await this._userEntity.findOne({
      where: { emails: [email] },
    });
    return entity && User.transform(entity);
  }
  public async getByLogin(login: string): Promise<IUser> {
    if (!login) {
      return null;
    }

    const usernameEntity = await this._userEntity.findOne({
      where: { username: login },
    });
    const emailEntity = await this._userEntity.findOne({
      where: { emails: [login] },
    });

    if (usernameEntity || emailEntity) {
      return User.transform(usernameEntity || emailEntity);
    }

    return null;
  }
  public async getForPayload(payload: UserPayload): Promise<IUser> {
    if (!payload) {
      return null;
    }

    const entity = await this._userEntity.findOne({
      where: {
        id: payload.id,
        username: payload.username,
        emails: [payload.primaryEmail],
        lastPasswordChangedAt: payload.lastPasswordChanged,
      },
    });

    return entity && User.transform(entity);
  }

  public async create(dto: CreateUserDto): Promise<IUser> {
    if (!dto) {
      return null;
    }

    const createdEntity = this._userEntity.create(dto);
    await createdEntity.save();
    return createdEntity && User.transform(createdEntity);
  }

  public async updateProfile(user: Partial<IUser>): Promise<IUser> {
    if (!user && !user.id) {
      return null;
    }
    const entity = await this._userEntity.findOne(user.id);

    if (!entity) {
      return null;
    }

    entity.alias = user?.alias || entity?.alias;
    entity.urlAlias = user?.urlAlias || entity?.urlAlias;
    entity.description = user?.description || entity?.description;
    entity.location = user?.location || entity?.location;
    await entity.save();

    return entity;
  }
}
