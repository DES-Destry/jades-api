import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { TokenBlacklistItemModel } from 'src/auth/modules/token/models/token-blacklist-item.model';
import { UserRolePrivilegeModel } from 'src/user/modules/role/modules/privilege/privilege.model';
import { UserRoleModel } from 'src/user/modules/role/role.model';
import { UserContactModel } from 'src/user/modules/contact/contact.model';
import { UserEmailModel } from 'src/user/modules/email/email.model';
import { UserEmailIdentityModel } from 'src/user/modules/email/modules/identity/identity.model';
import { UserStrikeAppealModel } from 'src/user/modules/strike/modules/appeal/appeal.model';
import { UserStrikeRateModel } from 'src/user/modules/strike/modules/rate/rate.model';
import { UserStrikeModel } from 'src/user/modules/strike/strike.model';
import { UserModel } from 'src/user/user.model';
import { UserSubscriptionModel } from 'src/user/modules/subscription/subscription.model';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DbConfig {
  public static readonly Options: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [
      UserModel,
      UserEmailIdentityModel,
      UserEmailModel,
      UserContactModel,
      UserSubscriptionModel,
      UserStrikeModel,
      UserStrikeAppealModel,
      UserStrikeRateModel,
      UserRoleModel,
      UserRolePrivilegeModel,
      TokenBlacklistItemModel,
    ],
  };

  public static readonly TOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: __dirname + '/migrations',
    },
  };
}
