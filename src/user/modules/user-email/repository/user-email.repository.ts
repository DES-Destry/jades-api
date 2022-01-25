import { InjectModel } from '@nestjs/sequelize';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { UserEmail } from 'src/shared/domain/user-email';
import { CreateUserEmailDto } from '../dtos/create-user-email.dto';
import { IUserEmailRepository } from '../interfaces/user-email-repository.interface';
import { UserEmailModel } from '../user-email.model';

export class UserEmailRepository implements IUserEmailRepository {
  constructor(
    @InjectModel(UserEmailModel)
    private readonly _userEmailModel: typeof UserEmailModel,
  ) {}

  public async getById(id: string): Promise<IUserEmail> {
    if (!id) {
      return null;
    }

    const model = await this._userEmailModel.findByPk(id);
    return model && UserEmail.transform(model);
  }

  public async create(dto: CreateUserEmailDto): Promise<IUserEmail> {
    if (!dto) {
      return null;
    }

    const userEmailDomain = UserEmail.create({
      isVisible: false,
      ...dto,
    });
    const model = await this._userEmailModel.create(userEmailDomain);
    return model;
  }

  public async toggleMain(emailId: string): Promise<void> {
    if (!emailId) {
      return;
    }

    const model = await this._userEmailModel.findByPk(emailId);

    if (!model) {
      return;
    }

    model.isMain = true;

    const userEmails = await this._userEmailModel.findAll({
      where: { userId: model.userId },
    });

    for await (const userEmail of userEmails) {
      if (userEmail.id !== model.id) {
        userEmail.isMain = false;
        await userEmail.save();
      }
    }

    await model.save();
  }
  public async toggleVisible(emailId: string): Promise<void> {
    if (!emailId) {
      return;
    }

    const model = await this._userEmailModel.findByPk(emailId);

    if (!model) {
      return;
    }

    model.isVisible = !model.isVisible;
    await model.save();
  }

  public async deleteEmail(emailId: string): Promise<boolean> {
    if (!emailId) {
      return false;
    }

    const model = await this._userEmailModel.findByPk(emailId);

    if (model.isMain) {
      return false;
    }

    await model.destroy();
    return true;
  }
}
