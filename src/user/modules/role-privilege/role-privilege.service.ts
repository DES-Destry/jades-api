import { Injectable } from '@nestjs/common';
import {
  IRolePrivilege,
  Privilege,
} from 'src/shared/domain/interfaces/role-privilege.interface';
import { DeleteRolePrivilegeResponseDto } from './dtos/delete-privilege.dto';
import { RolePrivilegeRepository } from './repositories/role-privilege.repository';

@Injectable()
export class RolePrivilegeService {
  constructor(
    private readonly _rolePrivilegeRepository: RolePrivilegeRepository,
  ) {}

  public async getByIdOrNull(id: string): Promise<IRolePrivilege> {
    const privilege = await this._rolePrivilegeRepository.getById(id);
    return privilege;
  }

  public async createRolePrivilegeOrNull(
    roleId: string,
    privilege: Privilege,
  ): Promise<IRolePrivilege> {
    const rolePrivilege =
      await this._rolePrivilegeRepository.createRolePrivilege(
        roleId,
        privilege,
      );
    return rolePrivilege;
  }

  public async deleteRolePrivilege(
    privilegeId: string,
  ): Promise<DeleteRolePrivilegeResponseDto> {
    const isDeleted = await this._rolePrivilegeRepository.deleteRolePrivilege(
      privilegeId,
    );
    return { isDeleted };
  }
}
