import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiServerOperation } from 'src/shared/decorators/api-server-operation.decorator';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
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

  @ApiServerOperation(
    'Get data about authenticated user.',
    'Only provide a JWT access token to the header to get full info about user.',
  )
  @ApiCreatedResponse({
    type: null,
    description: 'User data, that got by JWT access token.',
  })
  @ApiBearerAuth('jwt-token')
  @Post('/get-me')
  // TODO implement @User decorator
  public async getMe(@Request() req): Promise<ActionResultDto<IUser>> {
    const user = req.user;
    delete user.password;

    return user;
  }

  @ApiServerOperation(
    'Refresh tokens.',
    'Use refresh token to get new pair of access and refresh token. Provided refresh token will be deprecated.',
  )
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
