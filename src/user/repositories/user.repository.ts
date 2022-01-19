import { InjectModel } from '@nestjs/sequelize';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { User } from 'src/shared/domain/user';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserRepository } from '../interfaces/user-repository.dto';
import { UserModel } from '../user.model';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserModel) private readonly _userModel: typeof UserModel,
  ) {}

  public async getById(userId: string): Promise<IUser> {
    const model = await this._userModel.findByPk(userId);
    return model && User.transform(model);
  }
  public async getByUsername(username: string): Promise<IUser> {
    const model = await this._userModel.findOne({
      where: { username },
    });
    return model && User.transform(model);
  }
  public async getByEmail(email: string): Promise<IUser> {
    const model = await this._userModel.findOne({
      where: { emails: [email] },
    });
    return model && User.transform(model);
  }
  public async getByLogin(login: string): Promise<IUser> {
    const usernameModel = await this._userModel.findOne({
      where: { username: login },
    });
    const emailModel = await this._userModel.findOne({
      where: { emails: [login] },
    });

    if (usernameModel || emailModel) {
      return User.transform(usernameModel || emailModel);
    }

    return null;
  }

  public async create(dto: CreateUserDto): Promise<IUser> {
    const model = await this._userModel.create(dto);
    return model && User.transform(model);
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
    await model.save();

    return model;
  }
  public async verify(userId: string): Promise<void> {
    const model = await this._userModel.findByPk(userId);

    if (!model) {
      return null;
    }

    model.isVerified = true;
    await model.save();
  }
}
