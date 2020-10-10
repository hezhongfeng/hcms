import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  find(id: string): Promise<Permission> {
    return this.permissionRepository.findOne(id);
  }

  findOne(option: any): Promise<Permission> {
    return this.permissionRepository.findOne(option);
  }

  async create(permission: Permission) {
    return await this.permissionRepository.save(permission);
  }

  // async addRole(userId: number, roleId: number) {
  //   const user = await this.userRepository.findOne(userId, { relations: ['roles'] });
  //   if (!user.roles.some(role => role.id === roleId)) {
  //     await this.userRepository.createQueryBuilder().relation(User, 'roles').of(userId).add(roleId);
  //   }
  // }

  // async getRoles(id) {
  //   return this.userRepository.findOne(id, { relations: ['roles'] });
  // }

  // async removeRole(userId: number, roleId: number) {
  //   const user = await this.userRepository.findOne(userId, { relations: ['roles'] });
  //   if (user.roles.some(role => role.id === roleId)) {
  //     await this.userRepository.createQueryBuilder().relation(User, 'roles').of(userId).remove(roleId);
  //   }
  // }
}
