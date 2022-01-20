import { InjectModel } from '@nestjs/sequelize';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { CreateUserEmailDto } from '../dtos/create-user-email.dto';
import { IUserEmailRepository } from '../interfaces/user-email-repository.interface';
import { UserEmailModel } from '../user-email.model';

export class UserEmailRepository implements IUserEmailRepository {
  constructor(
    @InjectModel(UserEmailModel)
    private readonly _userEmailModel: typeof UserEmailModel,
  ) {}

  public async create(dto: CreateUserEmailDto): Promise<IUserEmail> {
    const model = await this._userEmailModel.create(dto);
    return model;
  }

  public async toggleMain(emailId: string): Promise<void> {
    const model = await this._userEmailModel.findByPk(emailId);

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
    const model = await this._userEmailModel.findByPk(emailId);
    model.isVisible = !model.isVisible;
    await model.save();
  }

  public async deleteEmail(emailId: string): Promise<boolean> {
    const model = await this._userEmailModel.findByPk(emailId);

    if (model.isMain) {
      return false;
    }

    await model.destroy();
    return true;
  }
}
