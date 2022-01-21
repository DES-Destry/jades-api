import { Injectable } from '@nestjs/common';
import { IRole } from 'src/shared/domain/interfaces/role.interface';
import { DeleteRoleResponseDto } from './dtos/delete-role.dto';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly _roleRepository: RoleRepository) {}

  public async getById(id: string): Promise<IRole> {
    const role = await this._roleRepository.getById(id);
    return role;
  }

  public async createRole(name: string): Promise<IRole> {
    const role = await this._roleRepository.createRole(name);
    return role;
  }
  public async addRolePrivilege(
    roleId: string,
    privilegeId: string,
  ): Promise<void> {
    await this._roleRepository.addRolePrivilege(roleId, privilegeId);
  }
  public async deleteRolePrivilege(
    roleId: string,
    privilegeId: string,
  ): Promise<void> {
    await this._roleRepository.deleteRolePrivilege(roleId, privilegeId);
  }

  public async deleteRole(roleId: string): Promise<DeleteRoleResponseDto> {
    const isDeleted = await this._roleRepository.deleteRole(roleId);
    return {
      isDeleted,
    };
  }
}
