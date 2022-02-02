import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/shared/config/app.config';

export class AccessTokenPayload {
  // RT - Refresh Token. AT & RT are JWT
  private static readonly _rtService = new JwtService(
    AppConfig.RtDefaultOptions,
  );

  // RT contains encoded AT in token field.
  // It makes chained AT and RT. It simple to add to blacklist AT and RT one time.
  constructor(accessToken: string) {
    if (!accessToken) {
      throw new Error('Cannot create payload of undefined access token.');
    }

    this.token = accessToken;
  }

  public readonly token: string;

  public async generateRefreshToken(): Promise<string> {
    const token = await AccessTokenPayload._rtService.signAsync({
      token: this.token,
    });

    return token;
  }

  public static async createFromTokenOrNull(
    refreshToken: string,
  ): Promise<AccessTokenPayload> {
    try {
      const payload =
        await AccessTokenPayload._rtService.verifyAsync<AccessTokenPayload>(
          refreshToken,
        );

      return payload;
    } catch (err) {
      return null;
    }
  }
}
