import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { Workflow } from './workflow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowStateModule } from './state/state.module';
import { WorkflowActionModule } from './action/action.module';
import { WorkflowAction } from './action/action.entity';
import { WorkflowState } from './state/state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workflow, WorkflowState, WorkflowAction]),
    WorkflowStateModule,
    WorkflowActionModule,
  ],
  providers: [WorkflowService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
