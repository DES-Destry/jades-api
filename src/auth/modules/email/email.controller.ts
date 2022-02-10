import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AuthorizedResponseDoc,
  AuthorizedResponseDto,
} from 'src/auth/dtos/common/auth.dto';
import { ApiServerOperation } from 'src/shared/decorators/api-server-operation.decorator';
import { CreateUserDto } from 'src/shared/dtos/create-user.dto';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ErrorDataDoc } from 'src/shared/result/dtos/error-data.doc';
import { LoginRequestDto } from './dtos/login.dto';
import { AuthEmailService } from './email.service';

@ApiTags('Auth - via Email')
@Controller('email')
export class AuthEmailController {
  constructor(private readonly _authEmailService: AuthEmailService) {}

  @ApiServerOperation({
    summary: 'Create new user.',
    description:
      'Sign up with provided parameters in request body - email, username and password.',
    validationApplied: true,
  })
  @ApiCreatedResponse({
    type: AuthorizedResponseDoc,
    description: 'Credentials for authorization.',
  })
  @Post('/create')
  public async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<ActionResultDto<AuthorizedResponseDto>> {
    const response = await this._authEmailService.createUserByEmail(dto);
    return response;
  }

  @ApiServerOperation({
    summary: 'Login user.',
    description:
      'Sign in via user login and password. Login can be a username or one of his emails.',
    validationApplied: true,
  })
  @ApiCreatedResponse({
    type: AuthorizedResponseDoc,
    description: 'Credentials for authorization.',
  })
  @ApiUnauthorizedResponse({
    type: ErrorDataDoc,
    description: 'If login and password is incorrect.',
  })
  @Post('/login')
  public async loginUser(
    @Body() dto: LoginRequestDto,
  ): Promise<ActionResultDto<AuthorizedResponseDto>> {
    const response = await this._authEmailService.loginUser(dto);
    return response;
  }
}
