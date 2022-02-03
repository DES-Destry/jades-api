import { InjectModel } from '@nestjs/sequelize';
import { IUserStrike } from 'src/shared/domain/interfaces/user-strike.interface';
import { UserStrike } from 'src/shared/domain/user-strike';
import { IUserStrikeRepository } from '../interfaces/strike-repository.interface';
import { UserStrikeModel } from '../strike.model';

export class UserStrikeRepository implements IUserStrikeRepository {
  constructor(
    @InjectModel(UserStrikeModel)
    private readonly _userStrikeModel: typeof UserStrikeModel,
  ) {}

  public async getById(id: string): Promise<IUserStrike> {
    if (!id) {
      return null;
    }

    const model = await this._userStrikeModel.findByPk(id);
    return model && UserStrike.transform(model);
  }

  public async createUserStrike(props: IUserStrike): Promise<IUserStrike> {
    if (!props) {
      return null;
    }

    const userStrikeDomain = UserStrike.create(props);
    await this._userStrikeModel.create(userStrikeDomain);
    return userStrikeDomain;
  }

  public async deleteUserStrike(strikeId: string): Promise<boolean> {
    if (!strikeId) {
      return false;
    }

    // TODO: check that entry not deleted and deletedAt value just was set
    const count = await this._userStrikeModel.destroy({
      where: { id: strikeId },
    });
    return count > 0;
  }
}
