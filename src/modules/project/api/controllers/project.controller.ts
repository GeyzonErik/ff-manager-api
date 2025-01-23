import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectRequest } from '../requests/create-project.request';
import { CreateProject } from '../../application/usecases/create-project.usecase';
import { ListProjects } from '../../application/usecases/list-projects.usecase';

@Controller('projects')
export class PojectController {
  constructor(
    private readonly createProjectUseCase: CreateProject,
    private readonly listProjectsUseCase: ListProjects,
  ) {}

  @Post()
  async create(@Body() body: CreateProjectRequest) {
    const response = await this.createProjectUseCase.execute(body);
    return response;
  }

  @Get()
  async list() {
    return await this.listProjectsUseCase.execute();
  }
}
