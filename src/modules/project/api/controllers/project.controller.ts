import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectRequest } from '../requests/create-project.request';
import { CreateProject } from '../../application/usecases/create-project.usecase';

@Controller('projects')
export class PojectController {
  constructor(private readonly createProjectUseCase: CreateProject) {}

  @Post()
  async create(@Body() body: CreateProjectRequest) {
    await this.createProjectUseCase.execute(body);
  }
}
