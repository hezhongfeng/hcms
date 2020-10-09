import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleService } from './role/role.service';
import { User } from './user.entity';
import { Response } from '../interface/http.response';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService, private roleService: RoleService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
    // const data = await this.userService.findAll();
    // return {
    //   data,
    //   code: '0',
    //   errorMessage: '',
    // };
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Response> {
    console.log(id);

    // const user = await this.userService.create({
    //   username: 'hezf',
    //   password: '123456',
    // } as User);
    // const role = await this.roleService.create({
    //   name: 'admin',
    //   keyName: '超级管理员',
    //   desc: '平台的最高权限拥有者',
    // } as Role);

    // await this.userService.addRole(user.id, role.id);

    // const user = await this.userService.getRoles(id);
    const user = await this.userService.find(id);
    // const role = await this.roleService.getUsers(id);
    // const role = await this.roleService.find(id);

    // await this.roleService.addUser(1, 3);
    // await this.roleService.deleteUser(1, 3);

    // await this.userService.addRole(user, role);

    // user.roles = [role];

    // console.log(role);

    // const data = user.roles;
    const data = user;

    return {
      data,
      code: '0',
      message: '',
    };
  }
}
