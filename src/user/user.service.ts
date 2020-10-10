import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async removeRole(userId: number, roleId: number) {
    const user = await this.userRepository.findOne(userId, { relations: ['roles'] });
    if (user.roles.some(role => role.id === roleId)) {
      await this.userRepository.createQueryBuilder().relation(User, 'roles').of(userId).remove(roleId);
    }
  }
}
