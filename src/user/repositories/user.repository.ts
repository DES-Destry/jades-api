import { InjectModel } from '@nestjs/sequelize';
import { UserPayload } from 'src/shared/domain/common/user.payload';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { User } from 'src/shared/domain/user';
import { CreateUserDto } from '../../shared/dtos/create-user.dto';
import { IUserRepository } from '../interfaces/user-repository.dto';
import { UserModel } from '../user.model';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserModel) private readonly _userModel: typeof UserModel,
  ) {}

  public async getById(userId: string): Promise<IUser> {
    if (!userId) {
      return null;
    }

    const model = await this._userModel.findByPk(userId);
    return model && User.transform(model);
  }
  public async getByUsername(username: string): Promise<IUser> {
    if (username) {
      return null;
    }

    const model = await this._userModel.findOne({
      where: { username },
    });
    return model && User.transform(model);
  }
  public async getByEmail(email: string): Promise<IUser> {
    if (!email) {
      return null;
    }

    const model = await this._userModel.findOne({
      where: { emails: [email] },
    });
    return model && User.transform(model);
  }
  public async getByLogin(login: string): Promise<IUser> {
    if (!login) {
      return null;
    }

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
  public async getForPayload(payload: UserPayload): Promise<IUser> {
    if (!payload) {
      return null;
    }

    const model = await this._userModel.findOne({
      where: {
        id: payload.id,
        username: payload.username,
        emails: [payload.primaryEmail],
        lastPasswordChanged: payload.lastPasswordChanged,
      },
      include: { all: true, nested: true },
    });

    return model && User.transform(model);
  }

  public async create(dto: CreateUserDto): Promise<IUser> {
    if (!dto) {
      return null;
    }

    const model = await this._userModel.create(dto);
    return model && User.transform(model);
  }

  public async updateProfile(user: Partial<IUser>): Promise<IUser> {
    if (!user && !user.id) {
      return null;
    }
    const model = await this._userModel.findByPk(user.id);

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
    if (!userId) {
      return;
    }

    const model = await this._userModel.findByPk(userId);

    if (!model) {
      return;
    }

    model.isVerified = true;
    await model.save();
  }
}
