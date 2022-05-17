import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DbConfig {
  // public static readonly Options: SequelizeModuleOptions = {
  //   dialect: 'postgres',
  //   host: process.env.POSTGRES_HOST,
  //   username: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DB,
  //   models: [
  //     UserModel,
  //     UserEmailIdentityModel,
  //     UserEmailModel,
  //     UserContactModel,
  //     UserSubscriptionModel,
  //     UserStrikeModel,
  //     UserStrikeAppealModel,
  //     UserStrikeRateModel,
  //     UserRoleModel,
  //     UserRolePrivilegeModel,
  //     TokenBlacklistItemModel,
  //   ],
  // };

  public static readonly Options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || '',
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || '',
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    entities: [__dirname + '/../**/entity/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    logging: true,
    synchronize: false,
    migrationsTableName: 'device_db_migrations',
    cli: {
      migrationsDir: __dirname + '/migrations',
    },
  };
}
