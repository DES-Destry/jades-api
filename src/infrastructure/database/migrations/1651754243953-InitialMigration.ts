import { RateType } from 'src/shared/domain/common/rate-type';
import { UserGender } from 'src/shared/domain/common/user-gender';
import { UserScope } from 'src/shared/domain/common/user-interests';
import { UserStrikeLevel } from 'src/shared/domain/common/user-strike-level';
import { Privilege } from 'src/shared/domain/interfaces/user-role-privilege.interface';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitialMigration1651754243953 implements MigrationInterface {
  private readonly _userIdFk = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  private readonly _issuerIdFk = new TableForeignKey({
    columnNames: ['issuer_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  private readonly _subscriberIdFk = new TableForeignKey({
    columnNames: ['subscriber_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  private readonly _writerIdFk = new TableForeignKey({
    columnNames: ['writer_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  private readonly _appealIdFk = new TableForeignKey({
    columnNames: ['appeal_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'user_strike_appeals',
    onDelete: 'CASCADE',
  });

  private readonly _emailIdFk = new TableForeignKey({
    columnNames: ['email_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'user_emails',
    onDelete: 'CASCADE',
  });

  private readonly _roleIdFk = new TableForeignKey({
    columnNames: ['role_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'user_roles',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      // Users table
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'username', type: 'varchar', isUnique: true },
          { name: 'alias', type: 'varchar', isNullable: true },
          {
            name: 'url_alias',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          { name: 'description', type: 'varchar', isNullable: true },
          { name: 'gender', type: 'enum', enum: Object.keys(UserGender) },
          { name: 'password', type: 'varchar' },
          { name: 'karma', type: 'int' },
          { name: 'location', type: 'varchar', isNullable: true },
          { name: 'scope', type: 'enum', enum: Object.keys(UserScope) },
          { name: 'company', type: 'varchar', isNullable: true },
          { name: 'last_password_changed_at', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User roles table
    await queryRunner.createTable(
      new Table({
        name: 'user_roles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'name', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User strike rates
    await queryRunner.createTable(
      new Table({
        name: 'user_strike_rates',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'rate_type', type: 'enum', enum: Object.keys(RateType) },
          { name: 'user_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User emails
    await queryRunner.createTable(
      new Table({
        name: 'user_emails',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'user_id', type: 'uuid' },
          { name: 'email', type: 'varchar' },
          { name: 'is_main', type: 'bool', default: false },
          { name: 'is_visible', type: 'bool', default: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User strikes
    await queryRunner.createTable(
      new Table({
        name: 'user_strikes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'user_id', type: 'uuid' },
          { name: 'issuer_id', type: 'uuid' },
          { name: 'level', type: 'enum', enum: Object.keys(UserStrikeLevel) },
          { name: 'reason', type: 'varchar', length: '1024' },
          { name: 'expired_at', type: 'timestamp' },
          { name: 'appeal_id', type: 'uuid', isNullable: true },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User strike appeals
    await queryRunner.createTable(
      new Table({
        name: 'user_strike_appeals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'appeal_content', type: 'varchar', length: '4096' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User contacts
    await queryRunner.createTable(
      new Table({
        name: 'user_contacts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'user_id', type: 'uuid' },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'varchar' },
          { name: 'media_type', type: 'varchar' },
          { name: 'link', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User email identities
    await queryRunner.createTable(
      new Table({
        name: 'user_email_identities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'email_id', type: 'uuid', isUnique: true },
          { name: 'verification_code', type: 'varchar' },
          { name: 'is_verified', type: 'bool' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User role privileges
    await queryRunner.createTable(
      new Table({
        name: 'user_role_privileges',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'role_id', type: 'uuid' },
          { name: 'privilege', type: 'enum', enum: Object.keys(Privilege) },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // User subscriptions
    await queryRunner.createTable(
      new Table({
        name: 'user_subscriptions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'subscriber_id', type: 'uuid' },
          { name: 'writer_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    // Token blacklist
    await queryRunner.createTable(
      new Table({
        name: 'token_blacklist',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'access_token', type: 'varchar' },
          { name: 'refresh_token', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey('user_strike_rates', this._userIdFk);
    await queryRunner.createForeignKey('user_emails', this._userIdFk);
    await queryRunner.createForeignKey('user_contacts', this._userIdFk);
    await queryRunner.createForeignKey('user_strikes', this._userIdFk);

    await queryRunner.createForeignKey('user_strikes', this._appealIdFk);
    await queryRunner.createForeignKey('user_strikes', this._issuerIdFk);

    await queryRunner.createForeignKey('user_subscriptions', this._writerIdFk);
    await queryRunner.createForeignKey(
      'user_subscriptions',
      this._subscriberIdFk,
    );

    await queryRunner.createForeignKey(
      'user_email_identities',
      this._emailIdFk,
    );

    await queryRunner.createForeignKey('user_role_privileges', this._roleIdFk);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_role_privileges', this._roleIdFk);

    await queryRunner.dropForeignKey('user_email_identities', this._emailIdFk);

    await queryRunner.dropForeignKey(
      'user_subscriptions',
      this._subscriberIdFk,
    );
    await queryRunner.dropForeignKey('user_subscriptions', this._writerIdFk);

    await queryRunner.dropForeignKey('user_strikes', this._issuerIdFk);
    await queryRunner.dropForeignKey('user_strikes', this._appealIdFk);

    await queryRunner.dropForeignKey('user_strikes', this._userIdFk);
    await queryRunner.dropForeignKey('user_contacts', this._userIdFk);
    await queryRunner.dropForeignKey('user_emails', this._userIdFk);
    await queryRunner.dropForeignKey('user_strike_rates', this._userIdFk);

    queryRunner.clearSqlMemory();

    await queryRunner.dropTable('token_blacklist');
    await queryRunner.dropTable('user_subscriptions');
    await queryRunner.dropTable('user_role_privileges');
    await queryRunner.dropTable('user_email_identities');
    await queryRunner.dropTable('user_contacts');
    await queryRunner.dropTable('user_strike_appeals');
    await queryRunner.dropTable('user_strikes');
    await queryRunner.dropTable('user_emails');
    await queryRunner.dropTable('user_strike_rates');
    await queryRunner.dropTable('user_roles');
    await queryRunner.dropTable('users');
  }
}
