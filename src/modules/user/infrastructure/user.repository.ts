import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from 'src/shared/domain/common/user.payload';
import { User } from 'src/modules/user/domain/user.aggregate-root';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../../shared/dtos (delete)/create-user.dto';
import { IUserRepository } from '../domain/repositories/user-repository.interface';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userEntity: Repository<UserEntity>,
    private readonly _userMapper: UserMapper,
  ) {}

  public async getById(userId: string): Promise<User> {
    if (!userId) {
      return null;
    }

    const entity = await this._userEntity.findOne(userId);
    return this._userMapper.toDomain(entity);
  }
  public async getByUsername(username: string): Promise<User> {
    if (username) {
      return null;
    }

    const entity = await this._userEntity.findOne({
      where: { username },
    });
    return this._userMapper.toDomain(entity);
  }
  public async getByEmail(email: string): Promise<User> {
    if (!email) {
      return null;
    }

    const entity = await this._userEntity.findOne({
      where: { emails: [email] },
    });
    return this._userMapper.toDomain(entity);
  }
  public async getByLogin(login: string): Promise<User> {
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
      return this._userMapper.toDomain(usernameEntity || emailEntity);
    }

    return null;
  }
  public async getForPayload(payload: UserPayload): Promise<User> {
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

    return this._userMapper.toDomain(entity);
  }

  public async create(dto: CreateUserDto): Promise<User> {
    if (!dto) {
      return null;
    }

    const createdEntity = this._userEntity.create(dto);
    await createdEntity.save();
    return this._userMapper.toDomain(createdEntity);
  }

  public async updateProfile(user: Partial<User>): Promise<User> {
    if (!user && !user.id) {
      return null;
    }
    const entity = await this._userEntity.findOne(user.id.unpack());

    if (!entity) {
      return null;
    }

    entity.alias = user?.alias || entity?.alias;
    entity.urlAlias = user?.urlAlias || entity?.urlAlias;
    entity.description = user?.description || entity?.description;
    entity.location = user.location?.country || entity?.location;
    await entity.save();

    return this._userMapper.toDomain(entity);
  }
}
