import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowAction } from './action.entity';

@Injectable()
export class WorkflowActionService {
  constructor(
    @InjectRepository(WorkflowAction)
    private readonly workflowActionRepository: Repository<WorkflowAction>,
  ) {}

  async create(action: WorkflowAction) {
    return await this.workflowActionRepository.save(action);
  }
}
