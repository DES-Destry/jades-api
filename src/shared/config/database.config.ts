import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { TokenBlacklistItemModel } from 'src/auth/modules/token/models/token-blacklist-item.model';
import { RolePrivilegeModel } from 'src/user/modules/role/modules/role-privilege/role-privilege.model';
import { RoleModel } from 'src/user/modules/role/role.model';
import { UserContactModel } from 'src/user/modules/user-contact/user-contact.model';
import { UserEmailModel } from 'src/user/modules/user-email/user-email.model';
import { UserIdentityModel } from 'src/user/modules/user-identity/user-identity.model';
import { UserStrikeAppealModel } from 'src/user/modules/user-strike/modules/user-strike-appeal/user-strike-appeal.model';
import { UserStrikeRateModel } from 'src/user/modules/user-strike/modules/user-strike-rate/user-strike-rate.model';
import { UserStrikeModel } from 'src/user/modules/user-strike/user-strike.model';
import { UserModel } from 'src/user/user.model';

export class DbConfig {
  public static readonly Options: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    models: [
      UserModel,
      UserIdentityModel,
      UserEmailModel,
      UserContactModel,
      UserStrikeModel,
      UserStrikeAppealModel,
      UserStrikeRateModel,
      RoleModel,
      RolePrivilegeModel,
      TokenBlacklistItemModel,
    ],
  };
}
