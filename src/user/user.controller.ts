import { Controller, Get, Param } from '@nestjs/common';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { UserExistsResponseDto } from './dtos/user-exists.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/username/:username/exists')
  public async isByUsernameExists(
    @Param('username') username: string,
  ): Promise<ActionResultDto<UserExistsResponseDto>> {
    try {
      const user = await this._userService.getByUsername(username);
      return ResultFactory.ok({
        exists: Boolean(user),
      });
    } catch (err) {
      ResultFactory.internalServerError(err.message);
    }
  }

  @Get('/email/:email/exists')
  public async isByEmailExists(
    @Param('email') email: string,
  ): Promise<ActionResultDto<UserExistsResponseDto>> {
    try {
      const user = await this._userService.getByEmail(email);
      return ResultFactory.ok({
        exists: Boolean(user),
      });
    } catch (err) {
      ResultFactory.internalServerError(err.message);
    }
  }
}
