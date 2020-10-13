import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './workflow.entity';
import { WorkflowState } from './state/state.entity';
import { WorkflowAction } from './action/action.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
    @InjectRepository(WorkflowState)
    private readonly stateRepository: Repository<WorkflowState>,
    @InjectRepository(WorkflowAction)
    private readonly actionRepository: Repository<WorkflowAction>,
  ) {}

  async findOne(option: any) {
    return this.workflowRepository.findOne(option);
  }

  async findAll(): Promise<[Workflow[], number]> {
    return this.workflowRepository.findAndCount({
      skip: 0,
      take: 10,
    });
  }

  async create(workflow: Workflow) {
    return await this.workflowRepository.save(workflow);
  }

  // 填入默认数据
  async createWorkflow(workflowObj: any) {
    const workflow = await this.workflowRepository.save({ name: workflowObj.name, desc: workflowObj.desc } as Workflow);
    for (const stateObj of workflowObj.states) {
      const state = await this.stateRepository.save({
        name: stateObj.name,
        keyName: stateObj.keyName,
        desc: stateObj.desc,
      } as WorkflowState);

      for (const actionObj of stateObj.actions) {
        const action = await this.actionRepository.save({
          name: actionObj.name,
          keyName: actionObj.keyName,
          desc: actionObj.desc,
        } as WorkflowAction);
        await this.stateRepository.createQueryBuilder().relation(WorkflowState, 'actions').of(state.id).add(action.id);
      }
      await this.workflowRepository.createQueryBuilder().relation(Workflow, 'states').of(workflow.id).add(state.id);
    }
    return workflow;
  }
}
