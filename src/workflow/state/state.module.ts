import { Module } from '@nestjs/common';
import { WorkflowStateService } from './state.service';
import { WorkflowState } from './state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowState])],
  providers: [WorkflowStateService],
  exports: [WorkflowStateService],
})
export class WorkflowStateModule {}
