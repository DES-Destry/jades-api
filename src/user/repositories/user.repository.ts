import { InjectModel } from '@nestjs/sequelize';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserRepository } from '../interfaces/user-repository.dto';
import { UserModel } from '../user.model';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserModel) private readonly _userModel: typeof UserModel,
  ) {}

  public async getById(userId: string): Promise<IUser> {
    const model = await this._userModel.findByPk(userId);
    return model;
  }
  public async getByUsername(username: string): Promise<IUser> {
    const model = await this._userModel.findOne({
      where: { username },
    });
    return model;
  }
  public async getByLogin(login: string): Promise<IUser> {
    // TODO: find user by username or email
    const model = await this._userModel.findOne({
      where: { username: login },
    });
    return model;
  }

  public async create(dto: CreateUserDto): Promise<IUser> {
    const model = await this._userModel.create(dto);
    return model;
  }

  public async updateProfile(user: Partial<IUser>): Promise<IUser> {
    const model = await this._userModel.findByPk(user?.id);

    if (!model) {
      return null;
    }

    model.alias = user?.alias || model?.alias;
    model.urlAlias = user?.urlAlias || model?.urlAlias;
    model.description = user?.description || model?.description;
    model.location = user?.location || model?.location;
    model.save();

    return model;
  }
}
