import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiServerOperation } from 'src/shared/decorators/api-server-operation.decorator';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser, IUserDoc } from 'src/shared/domain/interfaces/user.interface';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { AuthService } from './auth.service';
import {
  AuthorizedResponseDoc,
  AuthorizedResponseDto,
} from './dtos/common/auth.dto';
import { RefreshTokenRequestDto } from './dtos/refresh-token.dto';

@ApiTags('Auth - Main')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @ApiServerOperation({
    summary: 'Get data about authenticated user.',
    description:
      'Only provide a JWT access token to the header to get full info about user.',
  })
  @ApiCreatedResponse({
    type: IUserDoc,
    description: 'User data, that got by JWT access token.',
  })
  @Auth()
  @Post('/me')
  public async getMe(@User() user: IUser): Promise<ActionResultDto<IUser>> {
    delete user.password;
    for (const email of user.emails) {
      delete email.identity;
    }

    return ResultFactory.ok(user);
  }

  @ApiServerOperation({
    summary: 'Refresh tokens.',
    description:
      'Use refresh token to get new pair of access and refresh token. Provided refresh token will be deprecated.',
    validationApplied: true,
  })
  @ApiCreatedResponse({
    type: AuthorizedResponseDoc,
    description: 'Credentials for authorization.',
  })
  @Post('/refresh-token')
  public async refreshToken(
    @Body() dto: RefreshTokenRequestDto,
  ): Promise<ActionResultDto<AuthorizedResponseDto>> {
    const response = await this._authService.refreshToken(dto?.refreshToken);
    return response;
  }
}
