import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { Response } from '../../interface/http.response';

@Controller('api/v1/users')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
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
    const data = await this.roleService.create({
      name: 'hezf',
      keyName: '23423423',
      desc: '11',
    } as Role);
    return {
      data,
      code: '0',
      message: '',
    };
  }
}
