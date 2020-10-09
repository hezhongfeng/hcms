import { UserService } from './user/user.service';
import { RoleService } from './user/role/role.service';
import { PermissionService } from './user/permission/permission.service';
import { User } from './user/user.entity';
import { Role } from './user/role/role.entity';
import { Permission } from './user/permission/permission.entity';

const initData = async function (
  userService: UserService,
  roleService: RoleService,
  permissionService: PermissionService,
) {
  console.log('initData function');

  const adminPermission = await permissionService.create({
    name: '超级管理员权限',
    keyName: 'admin',
    desc: '超级管理员权限',
  } as Permission);

  const user = await userService.create({
    username: 'admin',
    password: '123456',
  } as User);

  const role = await roleService.create({
    name: '超级管理员',
    keyName: 'admin',
    desc: '平台的最高权限拥有者',
  } as Role);

  await roleService.addPermission(role.id, adminPermission.id);

  await userService.addRole(user.id, role.id);
};

export { initData };
