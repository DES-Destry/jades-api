import { JwtModuleOptions } from '@nestjs/jwt';

export class AppConfig {
  public static readonly Environment = process.env.NODE_ENV;
  public static readonly Port = process.env.PORT;

  public static readonly JwtSecret = process.env.JWT_SECRET;
  public static readonly JwtTtl = process.env.JWT_TTL;
  public static readonly RtSecret = process.env.RT_SECRET;
  public static readonly RtTtl = process.env.RT_TTL;
  public static readonly SaltSecret = parseInt(process.env.SALT_SECRET);
  public static readonly BetaKey = process.env.BETA_KEY;

  public static readonly JwtDefaultOptions: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_TTL,
      issuer: 'Jades-API-AT-Manager',
      subject: 'API-AT',
    },
  };

  public static readonly RtDefaultOptions: JwtModuleOptions = {
    secret: process.env.RT_SECRET,
    signOptions: {
      expiresIn: process.env.RT_TTL,
      issuer: 'Jades-API-RT-Manager',
      subject: 'API-RT',
    },
  };

  public static readonly Swagger500Description =
    'Server throws exception. Create an issue in https://github.com/DES-Destry/jades-api/issues, please. It will help to grow up.';
}
