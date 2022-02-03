import { Body, Injectable } from '@nestjs/common';
import { hash as genHash, genSalt, compare } from 'bcrypt';
import { AuthorizedResponseDto } from 'src/auth/dtos/common/auth.dto';
import { AppConfig } from 'src/shared/config/app.config';
import { UserPayload } from 'src/shared/domain/common/user.payload';
import { User } from 'src/shared/domain/user';
import { CreateUserDto } from 'src/shared/dtos/create-user.dto';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { UserService } from 'src/user/user.service';
import { AuthTokenService } from '../token/token.service';
import { LoginRequestDto } from './dtos/login.dto';

@Injectable()
export class AuthEmailService {
  constructor(
    private readonly _userService: UserService,
    private readonly _tokenService: AuthTokenService,
  ) {}

  // Sign up
  public async createUserByEmail(
    dto: CreateUserDto,
  ): Promise<ActionResultDto<AuthorizedResponseDto>> {
    const user = await this._userService.createUserOrNull(dto);

    if (!user) {
      ResultFactory.forbidden(
        'User with this login(username/email) already exists',
      );
    }

    if (!user.password) {
      ResultFactory.badRequest('Incorrect password got', [
        'Password must be not NULL!',
      ]);
    }

    user.password = await this.hashPasswordOrNull(user.password);
    const userDomain = User.transform(user);
    const userPayload = new UserPayload(userDomain);

    const tokenPair = await this._tokenService.generateTokenPairForPayload(
      userPayload,
    );

    return ResultFactory.ok({
      ...tokenPair,
      userId: user.id,
    });
  }

  // Sign in
  public async loginUser(
    @Body() { login, password }: LoginRequestDto,
  ): Promise<ActionResultDto<AuthorizedResponseDto>> {
    const user = await this._userService.getByLoginOrNull(login);

    if (!user) {
      ResultFactory.unauthorized('Incorrect login or password');
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      ResultFactory.unauthorized('Incorrect login or password');
    }

    const userDomain = User.transform(user);
    const userPayload = new UserPayload(userDomain);

    const tokenPair = await this._tokenService.generateTokenPairForPayload(
      userPayload,
    );

    return ResultFactory.ok({
      ...tokenPair,
      userId: user.id,
    });
  }

  private async hashPasswordOrNull(password: string): Promise<string> {
    if (!password) {
      return null;
    }

    const salt = await genSalt(AppConfig.SaltSecret);
    const hash = await genHash(password, salt);

    return hash;
  }
}
