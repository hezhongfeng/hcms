import { UserService } from './user/user.service';
import { RoleService } from './user/role/role.service';
import { PermissionService } from './user/permission/permission.service';
import { WorkflowService } from './workflow/workflow.service';
import { User } from './user/user.entity';
import { Role } from './user/role/role.entity';
import { Permission } from './user/permission/permission.entity';
import { Workflow } from './workflow/workflow.entity';
import { WorkflowState } from './workflow/state/state.entity';
import { WorkflowAction } from './workflow/action/action.entity';

const initData = async function (
  userService: UserService,
  roleService: RoleService,
  permissionService: PermissionService,
  workflowService: WorkflowService,
) {
  console.log('initData function start.');

  let adminPermission = null;
  let adminUser = null;
  let adminRole = null;
  let defaultWorkflow = null;

  adminPermission = await permissionService.findOne({
    keyName: 'admin',
  });

  // 已经init
  // if (adminPermission) {
  //   return;
  // }

  // 初始化工作流相关
  // const workflow = {
  //   name: '祥云工作流',
  //   desc: '初始工作流',
  // } as Workflow;

  // const states: WorkflowState[] = [
  //   {
  //     name: '待测试',
  //     keyName: 'tester-approve',
  //   },
  // ] as WorkflowState[];

  defaultWorkflow = await workflowService.createWorkflow({
    name: '祥云工作流',
    desc: '初始工作流',
    states: [
      {
        name: '测试中',
        keyName: 'testing',
        desc: '流程的初始状态，主要对各个终端的表现形势和内容进行测试',
        actions: [
          {
            name: '通过',
            keyName: 'tester-approve',
          },
          {
            name: '驳回',
            keyName: 'tester-reject',
          },
        ],
      },
      {
        name: '审核中',
        keyName: 'reviewing',
        desc: '这阶段主要对文字和图片内容进行审核',
        actions: [
          {
            name: '通过',
            keyName: 'reviewer-approve',
          },
          {
            name: '驳回',
            keyName: 'reviewer-reject',
          },
        ],
      },
      {
        name: '待发布',
        keyName: 'publishing',
        desc: '测试审核阶段已经完成，待发布状态',
        actions: [
          {
            name: '正式发布',
            keyName: 'operation-publish',
          },
          {
            name: '取消发布',
            keyName: 'operation-cancel',
          },
        ],
      },
      {
        name: '已结束',
        keyName: 'finish',
        desc: '流程已完结，不可操作和改变状态',
        actions: [],
      },
    ],
  });

  console.log(defaultWorkflow);

  // adminPermission = await permissionService.create({
  //   name: '超级管理员权限',
  //   keyName: 'admin',
  //   desc: '超级管理员权限',
  // } as Permission);

  // adminUser = await userService.create({
  //   username: 'admin1',
  //   password: '123456',
  // } as User);

  // adminRole = await roleService.create({
  //   name: '超级管理员',
  //   keyName: 'admin',
  //   desc: '平台的最高权限拥有者',
  // } as Role);

  // await roleService.addPermission(adminRole.id, adminPermission.id);

  // await userService.addRole(adminUser.id, adminRole.id);
};

export { initData };
