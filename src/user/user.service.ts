import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role/role.entity';
// eslint-disable-next-line
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  find(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOne(option: any): Promise<User> {
    return this.userRepository.findOne(option);
  }

  async create(user: User) {
    user.password = bcrypt.hashSync(user.password);
    return await this.userRepository.save(user);
  }

  async addRole(userId: number, roleId: number) {
    const user = await this.userRepository.findOne(userId, { relations: ['roles'] });
    if (!user.roles.some(role => role.id === roleId)) {
      await this.userRepository.createQueryBuilder().relation(User, 'roles').of(userId).add(roleId);
    }
  }

  async getRoles(id) {
    return this.userRepository.findOne(id, { relations: ['roles'] });
  }

  async getPermissions(id) {
    const tempPermissions = [];
    const { roles } = await this.userRepository.findOne(id, { relations: ['roles'] });

    for (const role of roles) {
      const { permissions } = await this.roleRepository.findOne(role.id, { relations: ['permissions'] });
      for (const permission of permissions) {
        if (!tempPermissions.some(item => item.id === permission.id)) {
          tempPermissions.push(permission);
        }
      }
    }

    return tempPermissions;
  }

  async removeRole(userId: number, roleId: number) {
    const user = await this.userRepository.findOne(userId, { relations: ['roles'] });
    if (user.roles.some(role => role.id === roleId)) {
      await this.userRepository.createQueryBuilder().relation(User, 'roles').of(userId).remove(roleId);
    }
  }
}
