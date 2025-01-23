import {
  CreateProject,
  DetailProjectById,
  ListProjects,
} from '@modules/project/application/usecases';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProjectRequest } from '../requests';

@Controller('projects')
export class PojectController {
  constructor(
    private readonly createProjectUseCase: CreateProject,
    private readonly listProjectsUseCase: ListProjects,
    private readonly detailProjectByIdUseCase: DetailProjectById,
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

  @Get('/:id')
  async detail(@Param('id') id: string) {
    return await this.detailProjectByIdUseCase.execute({ id });
  }
}
