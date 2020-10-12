import { User } from './user/user.entity';
import { Role } from './user/role/role.entity';
import { Permission } from './user/permission/permission.entity';
import { Workflow } from './/workflow/workflow.entity';
import { WorkflowState } from './/workflow/state/state.entity';
import { WorkflowAction } from './/workflow/action/action.entity';
import { Process } from './process/process.entity';
import { ProcessRecord } from './process/record/record.entity';
import { Product } from './product/product.entity';
import { BaseType } from './product/basetype/basetype.entity';
import { ContentModel } from './product/contentmodel/contentmodel.entity';
import { Field } from './product/field/field.entity';
import { Item } from './product/item/item.entity';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

const modules: any[] = [UserModule, ProductModule];

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'hcms',
  entities: [
    User,
    Role,
    Permission,
    Workflow,
    WorkflowState,
    WorkflowAction,
    Process,
    ProcessRecord,
    Product,
    BaseType,
    ContentModel,
    Field,
    Item,
  ],
  synchronize: true,
};

export { modules, dbConfig };
