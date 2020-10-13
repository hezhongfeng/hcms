import { Module } from '@nestjs/common';
import { WorkflowActionService } from './action.service';
import { WorkflowAction } from './action.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowAction])],
  providers: [WorkflowActionService],
  exports: [WorkflowActionService],
})
export class WorkflowActionModule {}
