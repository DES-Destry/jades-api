export class AppConfig {
  public static readonly Environment = process.env.NODE_ENV;
  public static readonly Port = process.env.PORT;

  public static readonly JwtSecret = process.env.JWT_SECRET;
  public static readonly SaltSecret = process.env.SALT_SECRET;
  public static readonly BetaKey = process.env.BETA_KEY;
}
