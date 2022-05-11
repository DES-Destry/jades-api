import { IUserStrikeAppeal } from 'src/shared/domain/interfaces/user-strike-appeal.interface';
import { UserStrikeAppeal } from 'src/shared/domain/user-strike-appeal';
import { IUserStrikeAppealRepository } from '../interfaces/appeal-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStrikeAppealEntity } from '../appeal.entity';
import { Repository } from 'typeorm';

export class UserStrikeAppealRepository implements IUserStrikeAppealRepository {
  constructor(
    @InjectRepository(UserStrikeAppealEntity)
    private readonly _userStrikeAppealEntity: Repository<UserStrikeAppealEntity>,
  ) {}

  public async getById(id: string): Promise<IUserStrikeAppeal> {
    if (!id) {
      return null;
    }

    const entity = await this._userStrikeAppealEntity.findOne(id);
    return entity && UserStrikeAppeal.transform(entity);
  }

  public async createAppeal(
    props: IUserStrikeAppeal,
  ): Promise<IUserStrikeAppeal> {
    if (!props) {
      return null;
    }

    const appealDomain = UserStrikeAppeal.create(props);
    const entity = this._userStrikeAppealEntity.create(appealDomain);
    await entity.save();
    return appealDomain;
  }
  public async updateAppealContent(
    appealId: string,
    content: string,
  ): Promise<boolean> {
    if (!appealId || !content) {
      return false;
    }

    const entity = await this._userStrikeAppealEntity.findOne(appealId);

    if (!entity) {
      return false;
    }

    entity.appealContent = content;
    await entity.save();

    return true;
  }

  public async deleteAppeal(appealId: string): Promise<boolean> {
    if (!appealId) {
      return false;
    }

    const deleteResult = await this._userStrikeAppealEntity.delete({
      id: appealId,
    });

    return deleteResult.affected > 0;
  }
}
