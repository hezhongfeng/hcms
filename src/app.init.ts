import { UserService } from './user/user.service';
import { RoleService } from './user/role/role.service';
import { PermissionService } from './user/permission/permission.service';
import { WorkflowService } from './workflow/workflow.service';
import { ProductService } from './product/product.service';
import { User } from './user/user.entity';
import { Role } from './user/role/role.entity';
import { Permission } from './user/permission/permission.entity';
import { BaseType } from './product/basetype/basetype.entity';

const initData = async function (
  userService: UserService,
  roleService: RoleService,
  permissionService: PermissionService,
  workflowService: WorkflowService,
  productService: ProductService,
) {
  console.log('initData function start.');

  // 防止重复初始化数据
  if (
    await permissionService.findOne({
      keyName: 'admin',
    })
  ) {
    return;
  }

  // 初始化产品相关
  const baseTypes = [
    {
      name: '文本',
      keyName: 'text',
    },
    {
      name: '布尔',
      keyName: 'boolean',
    },
    {
      name: 'json',
      keyName: 'json',
    },
    {
      name: '图片',
      keyName: 'image',
    },
    {
      name: '视频',
      keyName: 'video',
    },
    {
      name: '音频',
      keyName: 'audio',
    },
  ];

  for (const baseType of baseTypes) {
    await productService.createBaseType(baseType as BaseType);
  }

  // 初始化工作流相关;
  await workflowService.createWorkflow({
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

  // 初始化角色权限相关
  const roles = [
    {
      name: '产品管理员',
      keyName: 'manager',
      desc: '编辑产品功能项的内容和提交测试',
      permissions: [
        {
          name: '功能项编辑',
          keyName: 'manager-edit',
          desc: '编辑产品内容的权限',
        },
        {
          name: '功能项提交',
          keyName: 'manager-release',
          desc: '发布产品内容的权限',
        },
      ],
    },
    {
      name: '测试人员',
      keyName: 'tester',
      desc: '测试此功能项内容的终端表现',
      permissions: [
        {
          name: '测试通过',
          keyName: 'tester-approve',
          desc: '进入下一流程',
        },
        {
          name: '测试驳回',
          keyName: 'tester-reject',
          desc: '测试不通过，需重新提交',
        },
      ],
    },
    {
      name: '审核人员',
      keyName: 'reviewer',
      desc: '审核此功能项内容',
      permissions: [
        {
          name: '审核通过',
          keyName: 'reviewer-approve',
          desc: '进入下一流程',
        },
        {
          name: '审核驳回',
          keyName: 'reviewer-reject',
          desc: '审核不通过，需重新提交',
        },
      ],
    },
    {
      name: '运维人员',
      keyName: 'operation',
      desc: '发布到生产环境',
      permissions: [
        {
          name: '正式发布',
          keyName: 'operation-publish',
          desc: '正式发布',
        },
        {
          name: '取消发布',
          keyName: 'operation-cancel',
          desc: '结束流程，不发布',
        },
      ],
    },
  ];

  for (const roleObj of roles) {
    const role = await roleService.create({
      name: roleObj.name,
      keyName: roleObj.keyName,
      desc: roleObj.desc,
    } as Role);
    for (const permissionObj of roleObj.permissions) {
      const permission = await permissionService.create({
        name: permissionObj.name,
        keyName: permissionObj.keyName,
        desc: permissionObj.desc,
      } as Permission);
      await roleService.addPermission(role.id, permission.id);
    }
  }

  const adminPermission = await permissionService.create({
    name: '超级管理员权限',
    keyName: 'admin',
    desc: '超级管理员权限',
  } as Permission);
  const adminUser = await userService.create({
    username: 'admin',
    password: 'admin_init',
  } as User);
  const adminRole = await roleService.create({
    name: '超级管理员',
    keyName: 'admin',
    desc: '平台的最高权限拥有者',
  } as Role);

  await roleService.addPermission(adminRole.id, adminPermission.id);
  await userService.addRole(adminUser.id, adminRole.id);

  // 初始化权限和Action的关系
  await workflowService.actionAddPermission('tester-approve', 'tester-approve');
  await workflowService.actionAddPermission('tester-reject', 'tester-reject');
  await workflowService.actionAddPermission('reviewer-approve', 'reviewer-approve');
  await workflowService.actionAddPermission('reviewer-reject', 'reviewer-reject');
  await workflowService.actionAddPermission('operation-publish', 'operation-publish');
  await workflowService.actionAddPermission('operation-cancel', 'operation-cancel');
};

export { initData };
