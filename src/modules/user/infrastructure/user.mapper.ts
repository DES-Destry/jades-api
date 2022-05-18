import { Injectable } from '@nestjs/common';
import { UUID } from 'src/shared/ddd/domain/value-objects/uuid.value-object';
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from 'src/shared/ddd/infrastructure/database/base-classes/orm-mapper.base';
import { User } from '../domain/user.aggregate-root';
import { IUser } from '../domain/user.interface';
import { Credentials } from '../domain/value-objects/credentials.vo';
import { Location } from '../domain/value-objects/location.vo';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMapper extends OrmMapper<User, UserEntity> {
  protected toDomainProps(ormEntity: UserEntity): EntityProps<IUser> {
    const id = new UUID(ormEntity.id);
    const props: IUser = {
      credentials: new Credentials({
        username: ormEntity.username,
        password: ormEntity.password,
      }),
      alias: ormEntity.alias,
      urlAlias: ormEntity.urlAlias,
      description: ormEntity.description,
      gender: ormEntity.gender,
      emails: ormEntity.emails,
      role: ormEntity.role,
      karma: ormEntity.karma,
      location: new Location({ country: ormEntity.location }),
      contacts: ormEntity.contacts,
      company: ormEntity.company,
      lastPasswordChangedAt: ormEntity.lastPasswordChangedAt,
    };

    return { id, props };
  }

  protected toOrmProps(domain: User): OrmEntityProps<UserEntity> {
    const props = domain.getPropsCopy();

    const ormEntityProps: OrmEntityProps<UserEntity> = {
      username: props.credentials.username,
      alias: props.alias,
      urlAlias: props.urlAlias,
      description: props.description,
      gender: props.gender,
      emails: props.emails,
      password: props.credentials.password,
      karma: props.karma,
      location: props.location.country,
      roleId: props.role.id,
      role: props.role,
      contacts: props.contacts,
      scope: props.scope,
      company: props.company,
      lastPasswordChangedAt: props.lastPasswordChangedAt,
    };

    return ormEntityProps;
  }
}
