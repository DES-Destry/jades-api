export class AppConfig {
  public static readonly Environment = process.env.NODE_ENV;
  public static readonly Port = process.env.PORT;

  public static readonly JwtSecret = process.env.JWT_SECRET;
  public static readonly SaltSecret = process.env.SALT_SECRET;
  public static readonly BetaKey = process.env.BETA_KEY;

  public static readonly Swagger500Description =
    'Server throws exception. Create an issue in https://github.com/DES-Destry/unimaster-blog-api/issues, please. It will help to grow up.';
}
