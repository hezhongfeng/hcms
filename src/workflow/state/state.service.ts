import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowState } from './state.entity';

@Injectable()
export class WorkflowStateService {
  constructor(
    @InjectRepository(WorkflowState)
    private readonly workflowStateRepository: Repository<WorkflowState>,
  ) {}

  async create(state: WorkflowState) {
    return await this.workflowStateRepository.save(state);
  }
}
