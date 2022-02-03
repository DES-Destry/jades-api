import { IUserStrikeAppeal } from 'src/shared/domain/interfaces/user-strike-appeal.interface';

export interface IUserStrikeAppealRepository {
  getById(id: string): Promise<IUserStrikeAppeal>;

  createAppeal(props: IUserStrikeAppeal): Promise<IUserStrikeAppeal>;
  updateAppealContent(appealId: string, content: string): Promise<boolean>;

  deleteAppeal(appealId: string): Promise<boolean>;
}
