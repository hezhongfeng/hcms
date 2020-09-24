import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  find(id: string): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  async create(role: Role) {
    return await this.roleRepository.save(role);
  }

  async addUser(roleId: number, userId: number) {
    const role = await this.roleRepository.findOne(roleId, { relations: ['users'] });
    if (!role.users.some(user => user.id === userId)) {
      await this.roleRepository.createQueryBuilder().relation(Role, 'users').of(roleId).add(userId);
    }
  }

  async getUsers(id: number) {
    return await this.roleRepository.findOne(id, { relations: ['users'] });
  }

  async removeUser(roleId: number, userId: number) {
    const role = await this.roleRepository.findOne(roleId, { relations: ['users'] });
    if (role.users.some(user => user.id === userId)) {
      await this.roleRepository.createQueryBuilder().relation(Role, 'users').of(roleId).remove(userId);
    }
  }
}
