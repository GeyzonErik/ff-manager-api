import {
  CreateProject,
  DetailProjectById,
  ListProjects,
  UpdateProjectById,
} from '@modules/project/application/usecases';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectRequest, UdpdateProjectRequest } from '../requests';

@Controller('projects')
export class PojectController {
  constructor(
    private readonly createProjectUseCase: CreateProject,
    private readonly listProjectsUseCase: ListProjects,
    private readonly detailProjectByIdUseCase: DetailProjectById,
    private readonly updateProjectByIdUseCase: UpdateProjectById,
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

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UdpdateProjectRequest) {
    return await this.updateProjectByIdUseCase.execute({ id, ...body });
  }
}
