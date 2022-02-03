import { IUserStrikeRate } from 'src/shared/domain/interfaces/user-strike-rate.interface';
import { ToggleRateResponseDto } from '../dtos/toggle-rate.dto';

export interface IUserStrikeRateRepository {
  getById(id: string): Promise<IUserStrikeRate>;

  toggleLike(userId: string): Promise<ToggleRateResponseDto>;
  toggleDislike(userId: string): Promise<ToggleRateResponseDto>;
}
