import { InjectModel } from '@nestjs/sequelize';
import { IUserStrikeAppeal } from 'src/shared/domain/interfaces/user-strike-appeal.interface';
import { UserStrikeAppeal } from 'src/shared/domain/user-strike-appeal';
import { IUserStrikeAppealRepository } from '../interfaces/appeal-repository.interface';
import { UserStrikeAppealModel } from '../appeal.model';

export class UserStrikeAppealRepository implements IUserStrikeAppealRepository {
  constructor(
    @InjectModel(UserStrikeAppealModel)
    private readonly _userStrikeAppealModel: typeof UserStrikeAppealModel,
  ) {}

  public async getById(id: string): Promise<IUserStrikeAppeal> {
    if (!id) {
      return null;
    }

    const model = await this._userStrikeAppealModel.findByPk(id);
    return model && UserStrikeAppeal.transform(model);
  }

  public async createAppeal(
    props: IUserStrikeAppeal,
  ): Promise<IUserStrikeAppeal> {
    if (!props) {
      return null;
    }

    const appealDomain = UserStrikeAppeal.create(props);
    await this._userStrikeAppealModel.create(appealDomain);
    return appealDomain;
  }
  public async updateAppealContent(
    appealId: string,
    content: string,
  ): Promise<boolean> {
    if (!appealId || !content) {
      return false;
    }

    const model = await this._userStrikeAppealModel.findByPk(appealId);

    if (!model) {
      return false;
    }

    model.appealContent = content;
    await model.save();

    return true;
  }

  public async deleteAppeal(appealId: string): Promise<boolean> {
    if (!appealId) {
      return false;
    }

    const count = await this._userStrikeAppealModel.destroy({
      where: { id: appealId },
    });

    return count > 0;
  }
}
