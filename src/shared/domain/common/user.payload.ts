import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/infrastructure/config/app.config';
import { User } from '../../../modules/user/domain/user.aggregate-root';

export class UserPayload {
  // AT - Access Token. AT & RT are JWT
  private static readonly _atService = new JwtService(
    AppConfig.JwtDefaultOptions,
  );

  constructor(user: User) {
    if (!user) {
      throw new Error('Cannot create payload of undefined user.');
    }

    this.id = user.id;
    this.username = user.username;
    this.lastPasswordChanged = user.lastPasswordChangedAt;
    this.primaryEmail = user.getPrimaryMail();
  }

  public readonly id: string;
  public readonly username: string;
  public readonly primaryEmail: string;
  public readonly lastPasswordChanged: Date;

  public async generateAccessToken(): Promise<string> {
    const token = await UserPayload._atService.signAsync({
      id: this.id,
      username: this.username,
      primaryEmail: this.primaryEmail,
      lastPasswordChanged: this.lastPasswordChanged,
    });

    return token;
  }

  public static async createFromTokenOrNull(
    refreshToken: string,
  ): Promise<UserPayload> {
    try {
      const payload = await UserPayload._atService.verifyAsync<UserPayload>(
        refreshToken,
      );
      return payload;
    } catch (err) {
      return null;
    }
  }
}
