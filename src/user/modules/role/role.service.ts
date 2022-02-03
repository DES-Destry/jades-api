import { Injectable } from '@nestjs/common';
import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { DeleteRoleResponseDto } from './dtos/delete-role.dto';
import { UserRoleRepository } from './repository/role.repository';

@Injectable()
export class UserRoleService {
  constructor(private readonly _roleRepository: UserRoleRepository) {}

  public async getByIdOrNull(id: string): Promise<IUserRole> {
    const role = await this._roleRepository.getById(id);
    return role;
  }

  public async createRoleOrNull(name: string): Promise<IUserRole> {
    const role = await this._roleRepository.createRole(name);
    return role;
  }

  public async deleteRole(roleId: string): Promise<DeleteRoleResponseDto> {
    const isDeleted = await this._roleRepository.deleteRole(roleId);
    return { isDeleted };
  }
}
