import { Injectable } from '@nestjs/common';
import { initData } from './app.init';
import { UserService } from './user/user.service';
import { RoleService } from './user/role/role.service';
import { PermissionService } from './user/permission/permission.service';
import { WorkflowService } from './workflow/workflow.service';
import { ProductService } from './product/product.service';

@Injectable()
export class AppService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private workflowService: WorkflowService,
    private productService: ProductService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    console.log('App Module Init.');
  }

  onApplicationBootstrap() {
    console.log('完全启动，开始初始化数据');
    initData(this.userService, this.roleService, this.permissionService, this.workflowService, this.productService);
  }
}
